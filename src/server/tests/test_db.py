from test_data import save_clothing_db_mock

def test_save_clothing_db_mock(mocker):
    mock_conn = mocker.patch("sqlite3.connect")
    mock_cursor = mock_conn.return_value.cursor.return_value

    save_clothing_db_mock("Flygplan", "jacket", "shell", 3)
    
    mock_conn.assert_called_once_with("wardrobe.db")
    mock_cursor.execute.assert_called_once_with("INSERT INTO clothing (name, layer,type,warmth) VALUES (?,?,?,?)", ("Flygplan", "jacket","shell",3)
    )