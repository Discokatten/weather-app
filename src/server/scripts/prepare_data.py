from pathlib import Path
import pandas as pd

from get_weather import get_weather
from tag_weather import label_row_by_layer as tag_weather

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'

def prepare():
    # Get historical weather
    df = get_weather("history")
    # Make labels and apply to historical data
    labels_df = df.apply(tag_weather, axis=1).apply(pd.Series)
    df = pd.concat([df, labels_df], axis=1)
    # Save labelled data
    df.to_csv(DATA_DIR / "historical_weather_labelled.csv", index=False)
    print(f"Saved {len(df)} labelled rows to data/historical_weather_labelled.csv")


if __name__ == "__main__":
    prepare()
    

