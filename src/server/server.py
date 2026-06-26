from flask import Flask, jsonify, request
from flask_cors import CORS
from scripts.clothes_api import get_all_clothing, create_clothing, update_clothing, get_clothing_by_id,delete_clothing
from utils.validate import validate_item


app = Flask (__name__)
CORS(app)

@app.route("/api/clothes", methods=['GET'])
def return_clothes():
    data = get_all_clothing()
    return jsonify({'clothes':data}),200 

@app.post("/api/clothes")
def add_clothes():
    body = request.get_json()
    # set missing values
    body.setdefault("size", None)
    body.setdefault("size_system", None)
    body.setdefault("weather", [])
    body.setdefault("season", [])
    
    errors = validate_item(body)
    if errors:
        return jsonify({"errors": errors}), 422
    # get id for new item
    try:
        new_pk = create_clothing(body)
    except ValueError as e:
        return jsonify({"error": str(e)}), 409
    body["id"] = new_pk

    return jsonify({
        "message": "created",
        "item": body
    }), 201

@app.put("/api/clothes/<int:id>")
def put_clothing(id: int):
    body = request.get_json()
    body["pk"] = id 
    body.setdefault("size", None)
    body.setdefault("size_system", None)

    errors = validate_item(body)
    if errors:
        print("Validation errors:", errors) 
        print("Request body:", body)      
        return jsonify({"errors": errors}), 422

    try:
        update_clothing(body)
    except ValueError as e:
        return jsonify({"error": str(e)}), 409

    return jsonify({"message":"updated","id": id}), 200

@app.get("/api/clothes/<int:id>")
def get_one_item(id: int):
    item = get_clothing_by_id(id)
    if not item:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"clothes": item}), 200

@app.delete("/api/clothes/<int:id>")
def delete_item(id: int):
    item = delete_clothing(id)
    if not item:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"message":"deleted","id": item}), 200

if __name__ == "__main__":
    app.run(debug = False, host='127.0.0.1', port=8080) 

