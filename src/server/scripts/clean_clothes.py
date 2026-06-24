from pathlib import Path
import json
import sys
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent.parent))
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
JSON_PATH = DATA_DIR / "clothes_raw.json"
from utils.consts import VALID_SEASONS, VALID_WEATHER

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    # Drop row if critical data is missing
    df = df.dropna(subset=["name", "type", "layer", "warmth"])

    # Normalize data, lowercase and removing whitespace
    df["name"]  = df["name"].str.strip().str.lower()
    df["type"]  = df["type"].str.strip().str.lower()
    df["layer"] = df["layer"].str.strip().str.lower()

    # Forcing warmth to be a number, drop row if impossible. Keep values between 0 and 4
    df["warmth"] = pd.to_numeric(df["warmth"], errors="coerce")
    df = df.dropna(subset=["warmth"])
    df["warmth"] = df["warmth"].astype(int).clip(0, 4)

    # Season and weather must be an array
    df["season"]  = df["season"].apply(lambda x: x if isinstance(x, list) else [])
    df["weather"] = df["weather"].apply(lambda x: x if isinstance(x, list) else [])

    # Validating seasons and weather
    df["season"]  = df["season"].apply(lambda x: [s for s in x if s in VALID_SEASONS])
    df["weather"] = df["weather"].apply(lambda x: [w for w in x if w in VALID_WEATHER])

    # Clean sizing and add sizing-system
    df["size_system"] = df["size"].apply(_clean_size_system)
    df["size"] = df["size"].apply(_clean_size)          

    # Refactor id
    df = df.reset_index(drop=True)
    df["id"] = df.index + 1                            

    return df

def _clean_size_system(size) -> str | None:
    if pd.isna(size) or "":
        return "unknown"
    try:
        int(size)
        return "numeric"
    except (TypeError, ValueError):
        return "alpha"


def _clean_size(size) -> int | str | None:
    if pd.isna(size) or size == "":
        return "unknown"
    try:
    #  Convert string value to int ("92" => 92)
        return int(size)
    # If impossible, keep as string (intention keep "M", "XL")
    except (ValueError, TypeError):
        return str(size).strip()

if __name__ == "__main__":
    raw = pd.read_json(JSON_PATH)
    print(f"Loaded:  {len(raw)} items")

    # Clean data
    cleaned = clean_data(raw)
    print(f"Cleaned: {len(cleaned)} items")
    print(cleaned[["name", "type", "layer", "warmth", "season", "weather", "size", "size_system"]])
    
    # Save cleaned to new file
    with open(DATA_DIR/'clothes_cleaned.json', 'w', encoding='utf-8') as file:
        json.dump(cleaned.to_dict(orient="records"), file, indent=2, ensure_ascii=False)

    
    print(f"Saved to data/clohes_cleaned.json")
