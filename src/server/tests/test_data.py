import requests
import sqlite3

class Database:
    # simulate db
    def __init__(self):
        # simulate in-memory db
        self.data = {}
    
    def delete_clothing(self,pk: str):
        if pk in self.data:
            del self.data[pk]

    def create_clothing(self,pk, name):
        if pk in self.data: 
            raise ValueError("Couldn't create item")
        self.data[pk] = name
    
    def get_clothing_by_id(self,pk):
        return self.data.get(pk, None)
    

def get_current_weather():
    response = requests.get('https://api.open-meteo.com/v1/forecast?latitude=59.3294&longitude=18.0687&hourly=temperature_2m')
    if  response.status_code == 200:
        return response.json()
    else: 
        raise ValueError("Could not fetch current weather")
    
def get_weather_history():
    response = requests.get('https://archive-api.open-meteo.com/v1/archive')
    if  response.status_code == 200:
        return response.json()
    else: 
        raise ValueError("Could not fetch historic weather")
    

def save_clothing_db_mock(name, layer,type,warmth):
       conn = sqlite3.connect("wardrobe.db")
       cursor = conn.cursor()
       cursor.execute("INSERT INTO clothing (name, layer,type,warmth) VALUES (?,?,?,?)", (name, layer,type,warmth))
       conn.commit()
       conn.close()
# def save_clothing_db_mock(item):
#        conn = sqlite3.connect("wardrobe.db")
#        cursor = conn.cursor()
#        cursor.execute("""
#                    INSERT INTO clothing (name, type, layer, warmth, size, size_system)
#                 VALUES (:name, :type, :layer, :warmth, :size, :size_system)
#             """, item)
#        conn.commit()
#        conn.close()