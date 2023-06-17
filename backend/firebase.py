import firebase_admin
from firebase_admin import credentials, firestore
import json

def init_database():
    credential = credentials.Certificate("credentials.json")
    firebase_admin.initialize_app(credential)
    database = firestore.client()
    
    return database

    # デバッグ用
    # with open("./sample/database.json", "r") as file:
    #     datas = json.load(file)
    
def get_database(database):
    datas = database.collection('Database').stream()
    projects = [data.to_dict() for data in datas]
    json_data = json.loads(json.dumps(projects))
    
    return json_data

def write_database(database, new_json):
    for data in new_json:
        database.collection('Database').document(data["name"]).set(data)
        
# credential = credentials.Certificate("credentials.json")
# firebase_admin.initialize_app(credential)
# database = firestore.client()
# with open("./sample/database.json", "r") as file:
#     datas = json.load(file)

# for data in datas:
#     database.collection('Database').document(data["name"]).set(data)