from pathlib import Path
import pandas as pd
from utils.consts import VALID_LAYERS, BASE_LAYERS, EXTRA_LAYERS

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'

df = pd.read_json(DATA_DIR / 'clothes_cleaned.json')
clothes_list = df.to_dict(orient='records')

# Filter clothes based on temp and condition
def filter_clothes(temp: float, condition: str | None) -> list[dict]:
    season = _get_season(temp)
    layers = _get_layers(temp)

    # Store best item per layer
    outfit = {}

    # TODO match with similar conditions if no tags are found
    # Keep only items whose layer is needed and weather tags match current conditions
    filtered = [
        item for item in clothes_list
        if item["layer"] in layers
        and _weather_match(condition, item["weather"])
    ]

    # Sort for best items of each layer, season and warmth
    filtered.sort(key=lambda item: (
        # Don't remove if season is missing
        bool(item["season"]) and season not in item["season"],  
        # Prefer matching seasons
        len(item["season"]),                                     
        # Prefer warmer
        -item["warmth"]                                          
    ))
    
    # First item based on above conditions wins
    for item in filtered:
        if item["layer"] not in outfit:
            outfit[item["layer"]] = item

    # Return in order of wear, skip missing layers
    return [outfit[layer] for layer in VALID_LAYERS if layer in outfit]

    # If there's a weather condition, it must match, else skip
def _weather_match(condition: str | None, item_weather: list) -> bool:
    if not condition:    return True  
    if not item_weather: return True  
    return condition in item_weather        

def _get_season(temp: float) -> str:
    if temp < 0:   return 'winter'
    if temp < 10:  return 'autumn'
    if temp < 19:  return 'spring'
    return 'summer'

def _get_layers(temp: float) -> list:
    if temp >= 18: return BASE_LAYERS["LIGHT"]
    if temp >= 10: return BASE_LAYERS["MID"]
    if temp >= 5:  return BASE_LAYERS["BASELAYER"]
    if temp >= 0:  return EXTRA_LAYERS["WITHWOOL"]
    if temp > -5:  return BASE_LAYERS["WINTERLAYER"]
    return EXTRA_LAYERS["COLDWINTER"]