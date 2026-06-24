import sys
import pytest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from test_data import Database

@pytest.fixture
def db():
    # Create a fresh instance of db class for every run, and cleans up after test
    database = Database()
    # Provide fixture instance
    yield database 
    #  Cleanup
    database.data.clear()

def test_create_item(db):
    db.create_clothing(1,'Jacket')
    assert db.get_clothing_by_id(1) == "Jacket"

def test_create_duplicate_item(db):
    db.create_clothing(1,'Jacket')
    with pytest.raises(ValueError, match="Couldn't create item"):
        db.create_clothing(1,'Pants')

def test_delete_clothing(db):
    db.create_clothing(2,'Pants')
    db.delete_clothing(2)
    assert db.get_clothing_by_id(2) is None
