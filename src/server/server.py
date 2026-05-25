import json
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path
from scripts.clothes import get_clothes
import traceback


# app instance
app = Flask (__name__)
CORS(app)



BASE_DIR = Path(__file__).parent

DATA_DIR    = BASE_DIR / "data"
SCRIPTS_DIR = BASE_DIR / "scripts"


# with open(DATA_DIR / "data.json", "r", encoding="utf-8") as file:
#     data = json.load(file)
clothes = get_clothes()

def get_db_connection():
    conn = sqlite3.connect('clothes.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/init', methods=['GET'])
def init_db():
    conn = get_db_connection()
    conn.execute('''
                 CREATE TABLE IF NOT EXISTS clothes(
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 name TEXT NOT NULL,
                 clothing_type TEXT,
                 layer TEXT,
                 warmth REAL NOT NULL,
                 season TEXT,
                 weather TEXT
                 )
                 ''')
    conn.commit()
    conn.close()
    return jsonify({'message': 'Database Initiated'}
    )


@app.route("/api/clothes", methods=['GET'])
def return_clothes():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM clothes').fetchall()
    conn.close()
    
    # return jsonify({'clothes' : clothes})
    return jsonify([dict(row) for row in rows])

@app.route("/api/clothes", methods=['POST'])
def add_clothes():
    data = request.get_json()
    name= data.get('name')
    clothing_type= data.get('type')
    layer= data.get('layer')
    warmth= data.get('warmth')
    season= data.get('season')
    weather= data.get('weather')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO clothes(name, clothing_type, layer, warmth, season, weather) VALUES (?,?,?,?,?,?)', (name, clothing_type, layer, warmth, season, weather))
    conn.commit()
    new_id = cursor.lastrowid

    new_item = {
    "name": name,
    "type":clothing_type,
    "id": new_id,
    "layer":layer,
    "warmth": warmth,
    "season": season,
    "weather":weather 
    }
    # new_item = {
    # "name": data.get('name'),
    # "type": data.get('type'),
    # "id": len(clothes) + 1,
    # "layer": data.get('layer'),
    # "warmth": data.get('warmth'),
    # "season": data.get('season'),
    # "weather": data.get('weather') 
    # }
    
    # clothes.append(new_item)
    
    return jsonify({
        'message': "Product added",
        'item': new_item
        }), 201

if __name__ == "__main__":
    app.run(debug = True, port=8080) 

