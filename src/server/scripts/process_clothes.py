import json
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'


with open(DATA_DIR / "clothes.json", encoding="utf-8") as f:
        clothes = json.load(f)
    
for i, item in enumerate(clothes):
        del item["id"]          # remove old string id
        item["id"] = i + 1      # add new int id (1-based)
    

with open(DATA_DIR / "clothes_cleaned.json", "w", encoding="utf-8") as f:
    json.dump(clothes, f, ensure_ascii=False, indent=2)