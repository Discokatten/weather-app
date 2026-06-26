import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
from filter_clothes import filter_clothes
from utils.consts import VALID_LAYERS, SNOW_CODES, STORM_CODES, RAIN_CODES, WINDY_MS

def label_row_by_layer(row) -> dict:
    condition = _get_weather_condition(
        int(row['weather_code']),
        row['wind_speed_10m_max']
    )
    matched = filter_clothes(
        # TODO: dress for max-temp in summer, min-temp in winter
        # dress for daily maxtemp, priorotize clothes tagged with current season
        row['apparent_temperature_max'],
        condition
    )
    outfit_dict = {item['layer']: item['id'] for item in matched}
    # Tag with found layer, -1 if layer doesn't apply
    return {layer: outfit_dict.get(layer, -1) for layer in VALID_LAYERS}


def _get_weather_condition(weather_code: int, wind_speed: float) -> str | None:
    if weather_code in STORM_CODES: return "storm"
    if weather_code in SNOW_CODES:  return "snow"
    if weather_code in RAIN_CODES:  return "rain"
    if wind_speed >= WINDY_MS:      return "windy"
    return None
