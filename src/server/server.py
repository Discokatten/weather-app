from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path
from scripts.clothes_api import get_all_clothing, create_clothing, update_clothing, get_clothing_by_id,delete_clothing
from utils.validate import validate_item

app = Flask (__name__)
CORS(app)

BASE_DIR = Path(__file__).parent

DATA_DIR    = BASE_DIR / "data"
SCRIPTS_DIR = BASE_DIR / "scripts"
DB_PATH = Path(__file__).parent / "wardrobe.db"


@app.route("/api/clothes", methods=['GET'])
def return_clothes():
    data = get_all_clothing()
    return jsonify({'clothes':data}),200 

@app.post("/api/clothes")
def post_clothing():

    body = request.get_json()
    body.setdefault("size", None)
    body.setdefault("size_system", None)

    errors = validate_item(body)
    if errors:
        return jsonify({"errors": errors}), 422
    try:
        create_clothing(body)
    except ValueError as e:
        return jsonify({"error": str(e)}), 409

    return jsonify({"message":"created",
                    "name":body["name"]}), 201

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

    return jsonify({"message":"updated","item": body["name"]}), 200

@app.get("/api/clothes/<int:id>")
def get_one_clothing(id: int):
    item = get_clothing_by_id(id)
    if not item:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"clothes": item}), 200

@app.delete("/api/clothes/<int:id>")
def delete_item(id: int):
    item = delete_clothing(id)
    if not item:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"message":"deleted","item": id}), 200

if __name__ == "__main__":
    app.run(debug = False, host='127.0.0.1', port=8080) 

