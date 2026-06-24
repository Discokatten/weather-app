import os
from pathlib import Path
import sqlite3
import pytest

# 1. FORCE the environment variable first so the server code targets the test DB file
os.environ["WARDROBE_DB"] = str(Path(__file__).parent / "test_wardrobe.db")
DB_PATH = Path(os.environ["WARDROBE_DB"])

# 2. Define the schema creator function
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

# 3. CRITICAL: Execute table creation right now, before importing your application components
init_test_db()

# 4. NOW it is safe to import your Flask application
from server import app  

# ==============================================================================
# Fixture Blocks
# ==============================================================================
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
    """Standard Flask testing network utility client client wrapper."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

# import os
# from pathlib import Path
# import pytest
# import sqlite3
# from server import app

# # force testing database path 
# os.environ["WARDROBE_DB"] = str(Path(__file__).parent / "test_wardrobe.db")
# DB_PATH = Path(os.environ["WARDROBE_DB"])

# def init_test_db():
#     conn = sqlite3.connect(DB_PATH)
#     conn.executescript("""
#         CREATE TABLE IF NOT EXISTS clothing (
#             pk          INTEGER PRIMARY KEY AUTOINCREMENT,
#             name        TEXT NOT NULL,
#             type        TEXT,
#             layer       TEXT,
#             warmth      INTEGER,
#             size        TEXT,
#             size_system TEXT
#         );
#         CREATE TABLE IF NOT EXISTS clothing_season  (clothing_pk INTEGER, season  TEXT);
#         CREATE TABLE IF NOT EXISTS clothing_weather (clothing_pk INTEGER, weather TEXT);
#     """)
#     conn.close()

# @pytest.fixture(scope="session", autouse=True)
# def setup_db():
#     init_test_db()
#     yield
#     # delete db when all tests are done
#     DB_PATH.unlink(missing_ok=True)

# @pytest.fixture(autouse=True)
# def clean_tables():
#     # run before all individual tests to prevent data leaks
#     conn = sqlite3.connect(DB_PATH)
#     conn.executescript("""
#         DELETE FROM clothing_season;
#         DELETE FROM clothing_weather;
#         DELETE FROM clothing;
#     """)
#     conn.close()
#     yield

# @pytest.fixture()
# def client():
#     app.config["TESTING"] = True
#     with app.test_client() as client:
#         yield client
