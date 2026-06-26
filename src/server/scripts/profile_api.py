import os
from dotenv import load_dotenv
load_dotenv()

from pathlib import Path
BASE_DIR = Path(__file__).parent.parent
DB_PATH = Path(os.getenv("WARDROBE_DB", BASE_DIR / "wardrobe.db"))

import sqlite3

def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn

def get_all_profiles() -> list[dict]:
    with get_conn() as conn:
        rows = conn.execute("SELECT * FROM profile").fetchall()
    return [_row_to_dict(row) for row in rows]


def get_single_profile(id: int) -> dict | None:
    with get_conn() as conn:
        row = conn.execute(
            "SELECT * FROM profile WHERE pk = ?", (id,)
        ).fetchone()
    return _row_to_dict(row) if row else None

def create_profile(name: str) -> dict:
    with get_conn() as conn:
        try:
            cur = conn.execute(
                "INSERT INTO profile (name) VALUES (?)", (name,)
            )
            id = cur.lastrowid
        except sqlite3.IntegrityError as e:
            raise ValueError(f"Couldn't create item: {e}")
    return get_single_profile(id)

def update_profile(id: int, name: str) -> dict | None:
    with get_conn() as conn:
        conn.execute(
            "UPDATE profile SET name = ? WHERE pk = ?", (name, id)
        )
        conn.commit()

    return get_single_profile(id)

def delete_profile(id: int) -> bool:
    with get_conn() as conn:
        conn.execute("DELETE FROM profile WHERE pk = ?", (id,))
        conn.commit()

    return True

def _row_to_dict(row: sqlite3.Row) -> dict:
    d = dict(row)
    d["id"] = d.pop("pk")
    return d
