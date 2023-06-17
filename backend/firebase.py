import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

def init_database():
    credential = credentials.Certificate("credentials.json")
    firebase_admin.initialize_app(credential)
    database = firestore.client()

    # デバッグ用
    # with open("./sample/database.json", "r") as file:
    #     datas = json.load(file)
    
    return database
    
def get_database(database):
    datas = database.collection('Database').stream()
    projects = []
    
    for data in datas:
        projects.append(data.to_dict())
    string_data = json.dumps(projects)
    json_data = json.loads(string_data)
    
    return json_data

def write_database(database, new_json):
    for data in new_json:
        database.collection('Database').document(data["name"]).set(data)