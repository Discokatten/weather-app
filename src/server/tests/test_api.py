
def test_add_clothes(client):
    data = {
        "name": "Flygplansjacka", 
        "layer": "shell",
        "type": "jacket", 
        "warmth": 3,
        "season": [],
        "weather": []
    }
    response = client.post("/api/clothes", json=data)
    assert response.status_code == 201
    
    created_item = response.json["item"]
    assert "id" in created_item

    response = client.get("/api/clothes")
    assert response.status_code == 200
    assert created_item in response.json["clothes"]


def test_get_one_item(client):
    data = {
        "name": "Flygplansjacka", 
        "layer": "shell",
        "type": "jacket", 
        "warmth": 3,
        "season": [],
        "weather": []
    }
    response = client.post("/api/clothes", json=data)
    assert response.status_code == 201
    
    # get new id from db
    new_id = response.json["item"]["id"]

    response = client.get(f"/api/clothes/{new_id}")
    assert response.status_code == 200
    
    expected_output = {
        **data,
        "id": new_id,
        "size": None,
        "size_system": None
    }
    assert response.json["clothes"] == expected_output

def test_update_clothing(client):
    initial_data = {
        "name": "Vintage Windbreaker",
        "layer": "shell",
        "type": "jacket",
        "warmth": 2,
        "season": ["spring"],
        "weather": ["rain"]
    }
    post_response = client.post("/api/clothes", json=initial_data)
    assert post_response.status_code == 201
    
    new_id = post_response.json["item"]["id"]

    updated_data = {
        **initial_data,
        "name": "Flygplansjacka Pro",
        "warmth": 4,
        "season": ["winter"],
        "weather": ["snow", "wind"]
    }

    put_response = client.put(f"/api/clothes/{new_id}", json=updated_data)
    assert put_response.status_code == 200
    assert put_response.json["message"] == "updated"

    get_response = client.get(f"/api/clothes/{new_id}")
    assert get_response.status_code == 200
    
    returned_data = get_response.json["clothes"]
    
    assert returned_data["id"] == new_id
    assert returned_data["name"] == "Flygplansjacka Pro"
    assert returned_data["warmth"] == 4
    assert "snow" in returned_data["weather"]
    # confirm old data is gone
    assert "rain" not in returned_data["weather"] 


def test_get_all_items(client):
            response = client.get("/api/clothes")
            assert response.status_code == 200
            assert "clothes" in response.json
            assert isinstance(response.json["clothes"], list)