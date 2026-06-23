from pathlib import Path
import sqlite3
import sys
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
JSON_PATH = DATA_DIR / "clothes_raw.json"
DB_PATH = BASE_DIR / "wardrobe.db"
sys.path.insert(0, str(Path(__file__).parent.parent))
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
    if pd.isna(size) or size == "":
        return None
    try:
        int(size)
        return "numeric"
    except (TypeError, ValueError):
        return "alpha"

def _clean_size(size) -> int | str | None:
    if pd.isna(size) or size == "":
        return None
    try:
        return int(size)
    except (ValueError, TypeError):
        return str(size).strip()
def seed(df: pd.DataFrame):
    # Seed cleaned data to db
    DDL = """
        CREATE TABLE IF NOT EXISTS clothing (
            pk          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            type        TEXT    NOT NULL,
            layer       TEXT    NOT NULL,
            warmth      INTEGER NOT NULL,
            size        TEXT,
            size_system TEXT
        );
        CREATE TABLE IF NOT EXISTS clothing_season (
            clothing_pk INTEGER NOT NULL REFERENCES clothing(pk),
            season      TEXT    NOT NULL
        );
        CREATE TABLE IF NOT EXISTS clothing_weather (
            clothing_pk INTEGER NOT NULL REFERENCES clothing(pk),
            weather     TEXT    NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_season  ON clothing_season(season);
        CREATE INDEX IF NOT EXISTS idx_weather ON clothing_weather(weather);
    """
        #       size_system TEXT    CHECK(size_system IN ('alpha', 'numeric')),
        #     CHECK(
        #         (size IS NULL AND size_system IS NULL) OR
        #         (size IS NOT NULL AND size_system IS NOT NULL)
        # ));
    with sqlite3.connect(DB_PATH) as conn:
        conn.executescript(DDL)

        for _, row in df.iterrows():
            cur = conn.execute("""
                INSERT INTO clothing (name, type, layer, warmth, size, size_system)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (row["name"], row["type"], row["layer"], row["warmth"], row["size"], row["size_system"]))

            pk = cur.lastrowid
            conn.execute("DELETE FROM clothing_season  WHERE clothing_pk=?", (pk,))
            conn.execute("DELETE FROM clothing_weather WHERE clothing_pk=?", (pk,))

            for s in row["season"]:
                conn.execute("INSERT INTO clothing_season VALUES (?,?)", (pk, s))
            for w in row["weather"]:
                conn.execute("INSERT INTO clothing_weather VALUES (?,?)", (pk, w))

        conn.commit()
 
if __name__ == "__main__":
    raw = pd.read_json(JSON_PATH)
    print(f"Loaded:  {len(raw)} items")

    cleaned = clean_data(raw)
    print(f"Cleaned: {len(cleaned)} items")
    print(cleaned[["name", "type", "layer", "warmth", "season", "weather", "size", "size_system"]])

    seed(cleaned)
    print(f"Seeded → {DB_PATH}")
    # print(cleaned["size"], cleaned["size_system"])
#     from pathlib import Path
# import sqlite3
# import sys
# import pandas as pd

# BASE_DIR = Path(__file__).resolve().parent.parent
# DATA_DIR = BASE_DIR / "data"
# JSON_PATH = DATA_DIR / "clothes_raw.json"
# DB_PATH = BASE_DIR / "wardrobe.db"
# sys.path.insert(0, str(Path(__file__).parent.parent))
# from utils.consts import VALID_SEASONS, VALID_WEATHER

# def clean_data(df: pd.DataFrame) -> pd.DataFrame:
#     # Drop row if critical data is missing
#     df = df.dropna(subset=["name", "type", "layer", "warmth"])

#     # Normalize data, lowercase and removing whitespace
#     df["name"]  = df["name"].str.strip().str.lower()
#     df["type"]  = df["type"].str.strip().str.lower()
#     df["layer"] = df["layer"].str.strip().str.lower()

#     # Forcing warmth to be a number, drop row if impossible. Keep values between 0 and 4
#     df["warmth"] = pd.to_numeric(df["warmth"], errors="coerce")
#     df = df.dropna(subset=["warmth"])
#     df["warmth"] = df["warmth"].astype(int).clip(0, 4)

#     # Season and weather must be an array
#     df["season"]  = df["season"].apply(lambda x: x if isinstance(x, list) else [])
#     df["weather"] = df["weather"].apply(lambda x: x if isinstance(x, list) else [])

#     # Validating seasons and weather
#     df["season"]  = df["season"].apply(lambda x: [s for s in x if s in VALID_SEASONS])
#     df["weather"] = df["weather"].apply(lambda x: [w for w in x if w in VALID_WEATHER])

#     # Clean sizing and add sizing-system
#     df["size_system"] = df["size"].apply(_clean_size_system)
#     df["size"] = df["size"].apply(_clean_size)          

#     # Refactor id
#     df = df.reset_index(drop=True)
#     df["id"] = df.index + 1                            

#     return df

# def _clean_size_system(size) -> str | None:
#     if pd.isna(size) or "":
#         return "unknown"
#     try:
#         int(size)
#         return "numeric"
#     except (TypeError, ValueError):
#         return "alpha"


# def _clean_size(size) -> int | str | None:
#     if pd.isna(size) or size == "":
#         return "unknown"
#     try:
#     #  Convert string value to int ("92" => 92)
#         return int(size)
#     # If impossible, keep as string (intention keep "M", "XL")
#     except (ValueError, TypeError):
#         return str(size).strip()
    
# def seed(df: pd.DataFrame):
#     # Seed cleaned data to db
#     DDL = """
#         CREATE TABLE IF NOT EXISTS clothing (
#             pk      INTEGER PRIMARY KEY AUTOINCREMENT,
#             item_id TEXT    UNIQUE,
#             name    TEXT    NOT NULL,
#             type    TEXT    NOT NULL,
#             layer   TEXT    NOT NULL,
#             warmth  INTEGER NOT NULL,
#             size        TEXT,
#             size_system TEXT
#             );
#         CREATE TABLE IF NOT EXISTS clothing_season (
#             clothing_pk INTEGER NOT NULL REFERENCES clothing(pk),
#             season      TEXT    NOT NULL
#         );
#         CREATE TABLE IF NOT EXISTS clothing_weather (
#             clothing_pk INTEGER NOT NULL REFERENCES clothing(pk),
#             weather     TEXT    NOT NULL
#         );
#         CREATE INDEX IF NOT EXISTS idx_season  ON clothing_season(season);
#         CREATE INDEX IF NOT EXISTS idx_weather ON clothing_weather(weather);
#     """
#         #       size_system TEXT    CHECK(size_system IN ('alpha', 'numeric')),
#         #     CHECK(
#         #         (size IS NULL AND size_system IS NULL) OR
#         #         (size IS NOT NULL AND size_system IS NOT NULL)
#         # ));
#     with sqlite3.connect(DB_PATH) as conn:
#         conn.executescript(DDL)

#         for _, row in df.iterrows():
#             item_id = f"{row['type']}_{row['id']}"
#             cur = conn.execute("""
#                 INSERT INTO clothing (item_id, name, type, layer, warmth, size, size_system)
#                 VALUES (?, ?, ?, ?, ?, ?, ?)
#                 ON CONFLICT(item_id) DO UPDATE SET
#                     name=excluded.name, type=excluded.type,
#                     layer=excluded.layer, warmth=excluded.warmth,
#                     size=excluded.size,size_system=excluded.size_system
#             """, (item_id, row["name"], row["type"], row["layer"], row["warmth"], row["size"], row["size_system"]))

#             pk = cur.lastrowid
#             conn.execute("DELETE FROM clothing_season  WHERE clothing_pk=?", (pk,))
#             conn.execute("DELETE FROM clothing_weather WHERE clothing_pk=?", (pk,))

#             for s in row["season"]:
#                 conn.execute("INSERT INTO clothing_season VALUES (?,?)", (pk, s))
#             for w in row["weather"]:
#                 conn.execute("INSERT INTO clothing_weather VALUES (?,?)", (pk, w))
#         conn.commit()

# if __name__ == "__main__":
#     raw = pd.read_json(JSON_PATH)
#     print(f"Loaded:  {len(raw)} items")

#     cleaned = clean_data(raw)
#     print(f"Cleaned: {len(cleaned)} items")
#     print(cleaned[["name", "type", "layer", "warmth", "season", "weather", "size", "size_system"]])

#     seed(cleaned)
#     print(f"Seeded → {DB_PATH}")
#     # print(cleaned["size"], cleaned["size_system"])