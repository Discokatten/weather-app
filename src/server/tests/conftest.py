import os
from pathlib import Path
import sqlite3
import pytest

os.environ["WARDROBE_DB"] = str(Path(__file__).parent / "test_wardrobe.db")
DB_PATH = Path(os.environ["WARDROBE_DB"])

def init_test_db():
    conn = sqlite3.connect(DB_PATH)
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS clothing (
            pk          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT NOT NULL,
            type        TEXT,
            layer       TEXT,
            warmth      INTEGER,
            size        TEXT,
            size_system TEXT
        );
        CREATE TABLE IF NOT EXISTS clothing_season  (clothing_pk INTEGER, season  TEXT);
        CREATE TABLE IF NOT EXISTS clothing_weather (clothing_pk INTEGER, weather TEXT);
    """)
    conn.close()

init_test_db()

from server import app  

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    """Session scope fallback: yields instantly and unlinks the test file on runner teardown."""
    yield
    DB_PATH.unlink(missing_ok=True)

@pytest.fixture(autouse=True)
def clean_tables():
    """Wipes raw table contents between individual test cases to prevent data state leaks."""
    conn = sqlite3.connect(DB_PATH)
    conn.executescript("""
        DELETE FROM clothing_season;
        DELETE FROM clothing_weather;
        DELETE FROM clothing;
    """)
    conn.close()
    yield

@pytest.fixture()
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client