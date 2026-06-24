import pandas as pd
import openmeteo_requests
import requests_cache
from pathlib import Path
from retry_requests import retry

# sys.path.insert(0, str(Path(__file__).parent.parent))
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

# Make sure all required weather variables are listed here
# The order of variables in hourly or daily is important to assign them correctly below
CURRENT_REQ = ["apparent_temperature", "temperature_2m", "weather_code","wind_speed_10m", "wind_gusts_10m", "precipitation", "rain", "snowfall"]
HISTORY_REQ = ["temperature_2m","apparent_temperature", "precipitation", "rain", "snowfall", "weather_code", "wind_speed_10m", "wind_gusts_10m", "is_day"]

CURRENT_URL = "https://api.open-meteo.com/v1/forecast"
HISTORY_URL = "https://archive-api.open-meteo.com/v1/archive"
BASE_PARAMS = {
    "latitude": 59.3294,
    "longitude": 18.0687,
    "timezone": "Europe/Stockholm",
    "wind_speed_unit": "ms",
}

CURRENT_PARAMS = {**BASE_PARAMS, "current": CURRENT_REQ}
HISTORY_PARAMS = {**BASE_PARAMS, "start_date": "2023-01-01", "end_date": "2026-06-01", "hourly": HISTORY_REQ}


def get_weather(time: str = "current"):
    if time == "history":
        url = HISTORY_URL
        params = HISTORY_PARAMS
    else:
        url = CURRENT_URL
        params = CURRENT_PARAMS

    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]

    if time == "history":
        return _process_history(response)
    else:
        return _process_current(response)


def _process_history(response):
    hourly = response.Hourly()

    # Convert from Openmeteos format to NumPy Array, keeping index
    hourly_data = {var: hourly.Variables(i).ValuesAsNumpy() for i, var in enumerate(HISTORY_REQ)}
    hourly_data["date"] = pd.date_range(
        start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
        end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
        freq=pd.Timedelta(seconds=hourly.Interval()),
        inclusive="left",
    ).tz_convert(response.Timezone().decode())

    # Only use daytime hours
    hourly_df = pd.DataFrame(hourly_data)
    daytime_df = hourly_df[hourly_df["is_day"] == 1].copy()
    daytime_df["day"] = daytime_df["date"].dt.date

    # Combine daytime-hours to daily value
    daily_df = daytime_df.groupby("day").agg(
        apparent_temperature_max=("apparent_temperature", "max"),
        apparent_temperature_min=("apparent_temperature", "min"),
        temperature_2m_max=("temperature_2m", "max"),
        temperature_2m_min=("temperature_2m", "min"),
        wind_speed_10m_max=("wind_speed_10m", "max"),
        wind_gusts_10m_max=("wind_gusts_10m", "max"),
        precipitation_sum=("precipitation", "sum"),
        rain_sum=("rain", "sum"),
        snowfall_sum=("snowfall", "sum"),
        weather_code=("weather_code", "max"),
    ).reset_index().rename(columns={"day": "date"})

    # Drop empty rows
    daily_df = daily_df.dropna()
    # Save DF 
    daily_df.to_csv(DATA_DIR / "historical_weather.csv", index=False)

    print(f"Saved historical weather to data/historical_weather.csv")
    return daily_df


def _process_current(response):
    current = response.Current()

    # Convert from Openmeteos format to NumPy Array, keeping index
    current_data = {var: current.Variables(i).Value() for i, var in enumerate(CURRENT_REQ)}
       
    # Return as dataframe, renaming to match history-col-names. drop empty rows
    return pd.DataFrame([{
        "apparent_temperature_min": current_data["apparent_temperature"],
        "apparent_temperature_max": current_data["apparent_temperature"],
        "temperature_2m_min":       current_data["temperature_2m"],
        "temperature_2m_max":       current_data["temperature_2m"],
        "weather_code":             current_data["weather_code"],
        "wind_speed_10m_max":       current_data["wind_speed_10m"],
        "wind_gusts_10m_max":       current_data["wind_gusts_10m"],
        "precipitation_sum":        current_data["precipitation"],
        "rain_sum":                 current_data["rain"],
        "snowfall_sum":             current_data["snowfall"],
    }]).dropna()