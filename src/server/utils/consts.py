VALID_SEASONS = {"winter", "spring", "summer", "autumn"}
VALID_WEATHER = {"rain", "snow", "wind", "storm"}
VALID_LAYERS  = {"none","wool", "light", "mid", "shell", "hat", "scarf", "shoe", "mittens"}
VALID_TYPES   = {"jacket", "pants", "shoe", "hat", "tshirt", "mittens", "socks", "scarf"}

BASE_LAYERS = {
    "NONE":        ["shoe"],
    "LIGHT":       ["light", "shoe"],
    "MID":         ["mid", "shoe"],
    "BASELAYER":   ["shell", "mid", "hat", "mittens", "shoe", "scarf"],
    "WINTERLAYER": ["mid", "shell", "hat", "mittens", "shoe","scarf"],
}

EXTRA_LAYERS = {
    "WITHWOOL":   [*BASE_LAYERS["BASELAYER"], "wool"],
    "COLDWINTER": ["wool", *BASE_LAYERS["WINTERLAYER"]],
}

RAIN_CODES  = {51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82}
SNOW_CODES  = {71, 73, 75, 77, 85, 86}
STORM_CODES = {95, 96, 99}
WINDY_MS    = 5.5

REQUIRED_FIELDS = {"name", "type", "layer", "warmth"}
VALID_SIZE_SYSTEMS = {"alpha", "numeric"}
VALID_ALPHA_SIZES  = {"XS", "S", "M", "L", "XL", "XXL"}

FEATURE_COLS = ["apparent_temperature_min", "apparent_temperature_max","temperature_2m_min","temperature_2m_max","weather_code", "wind_speed_10m_max", "wind_gusts_10m_max","precipitation_sum", "rain_sum","snowfall_sum",]
TARGET_COLS = ["wool", "light", "mid", "shell", "hat", "scarf", "shoe", "mittens"]
