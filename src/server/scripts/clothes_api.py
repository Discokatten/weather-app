import os
from dotenv import load_dotenv
load_dotenv()

from pathlib import Path
BASE_DIR = Path(__file__).parent.parent
DB_PATH = Path(os.getenv("WARDROBE_DB", BASE_DIR / "wardrobe.db"))

import sqlite3


# DB_PATH = BASE_DIR / "wardrobe.db"
print("Using DB:", DB_PATH)
# Predict clothes, modellen hämtar current weather och kör predict

# GET säsong
# GET storlek
# GET rain/wind/snow
# GET alla kläder
# POST nya kläder
# PUT uppdatera kläder

def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # safe concurrent reads
    conn.execute("PRAGMA journal_mode=WAL")   
    conn.execute("PRAGMA foreign_keys=ON")
    return conn

def get_all_clothing(sort_by: str = "warmth", order: str = "asc") -> list[dict]:
    
    allowed = {"warmth", "name", "type", "layer", "id"}
    sort_by = sort_by if sort_by in allowed else "warmth"
    sort_by = "pk" if sort_by == "id" else sort_by
    order   = "ASC" if order.lower() == "asc" else "DESC"

    with get_conn() as conn:
        rows = conn.execute(f"""
            SELECT c.*,
                   GROUP_CONCAT(DISTINCT cs.season)  AS seasons,
                   GROUP_CONCAT(DISTINCT cw.weather) AS weathers
            FROM clothing c
            LEFT JOIN clothing_season  cs ON cs.clothing_pk = c.pk
            LEFT JOIN clothing_weather cw ON cw.clothing_pk = c.pk
            GROUP BY c.pk
            ORDER BY c.{sort_by} {order}
        """).fetchall()
    return [_row_to_dict(r) for r in rows]

def get_clothing_for(season: str, weather: str = "") -> list[dict]:
    # Find clothes by season or weather-tag
    query  = """
        SELECT c.*,
               GROUP_CONCAT(DISTINCT cs.season)  AS seasons,
               GROUP_CONCAT(DISTINCT cw.weather) AS weathers
        FROM clothing c
        JOIN clothing_season cs ON cs.clothing_pk = c.pk
        LEFT JOIN clothing_weather cw ON cw.clothing_pk = c.pk
        WHERE cs.season = ?
    """
    params: list = [season]

    if weather:
        query += " AND cw.weather = ?"
        params.append(weather)

    query += " GROUP BY c.pk ORDER BY c.warmth DESC"

    with get_conn() as conn:
        rows = conn.execute(query, params).fetchall()
    return [_row_to_dict(r) for r in rows]


def get_clothing_by_id(pk: int) -> dict | None:
    with get_conn() as conn:
        row = conn.execute("""
            SELECT c.*,
                   GROUP_CONCAT(DISTINCT cs.season)  AS seasons,
                   GROUP_CONCAT(DISTINCT cw.weather) AS weathers
            FROM clothing c
            LEFT JOIN clothing_season  cs ON cs.clothing_pk = c.pk
            LEFT JOIN clothing_weather cw ON cw.clothing_pk = c.pk
            WHERE c.pk = ?
            GROUP BY c.pk
        """, (pk,)).fetchone()
    return _row_to_dict(row) if row else None

def update_clothing(item: dict) -> int:
    with get_conn() as conn:
        conn.execute("""
            INSERT INTO clothing (pk, name, type, layer, warmth, size, size_system)
            VALUES (:pk, :name, :type, :layer, :warmth, :size, :size_system)
            ON CONFLICT(pk) DO UPDATE SET
                name        = excluded.name,
                type        = excluded.type,
                layer       = excluded.layer,
                warmth      = excluded.warmth,
                size        = excluded.size,
                size_system = excluded.size_system
        """, item)
        pk = item["pk"]

        conn.execute("DELETE FROM clothing_season  WHERE clothing_pk = ?", (pk,))
        conn.execute("DELETE FROM clothing_weather WHERE clothing_pk = ?", (pk,))

        for s in item.get("season", []):
            conn.execute("INSERT INTO clothing_season VALUES (?,?)", (pk, s))
        for w in item.get("weather", []):
            conn.execute("INSERT INTO clothing_weather VALUES (?,?)", (pk, w))

        conn.commit()
    return pk


def delete_clothing(pk: int) -> bool:
    with get_conn() as conn:
        row = conn.execute(
            "SELECT pk FROM clothing WHERE pk = ?", (pk,)
        ).fetchone()
        if not row:
            return False
        pk = row["pk"]
        conn.execute("DELETE FROM clothing_season  WHERE clothing_pk = ?", (pk,))
        conn.execute("DELETE FROM clothing_weather WHERE clothing_pk = ?", (pk,))
        conn.execute("DELETE FROM clothing WHERE pk = ?", (pk,))
        conn.commit()
    return True


def create_clothing(item: dict) -> int:
    with get_conn() as conn:
        try:
            cur = conn.execute("""
                INSERT INTO clothing (name, type, layer, warmth, size, size_system)
                VALUES (:name, :type, :layer, :warmth, :size, :size_system)
            """, item)
        except sqlite3.IntegrityError as e:
            raise ValueError(f"Couldn't create item: {e}")
        
        pk = cur.lastrowid
        for s in item.get("season", []):
            conn.execute("INSERT INTO clothing_season VALUES (?,?)", (pk, s))
        for w in item.get("weather", []):
            conn.execute("INSERT INTO clothing_weather VALUES (?,?)", (pk, w))
        conn.commit()
        
        return pk

def _row_to_dict(row: sqlite3.Row) -> dict:
    d = dict(row)
    d["id"] = d.pop("pk")
    d["season"]  = d["seasons"].split(",") if d.get("seasons") else []
    d["weather"] = d["weathers"].split(",") if d.get("weathers") else []
    d.pop("seasons", None)
    d.pop("weathers", None)
    return d
