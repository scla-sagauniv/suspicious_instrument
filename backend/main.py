import requests
import firebase
import string
from fastapi import FastAPI
from pydantic import BaseModel
import json

FIREBASE = firebase.init_database()
CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_API_KEY = "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"

app = FastAPI()
    
class Task(BaseModel):
    project_id: int
    title: str
    description: str
    method: str
    
class Member(BaseModel):
    project_id: int
    name: str
    skills: str
    method: str

# デバッグ用
# with open ("./sample/database.json") as jsondata:
#     database = json.load(jsondata)[0]

# Taskの変更を処理する
@app.post("/task")
def get_task_data(data: Task):
    # Firebase からデータベースの取得
    database = firebase.get_database(FIREBASE)
    project = int(data.project_id) - 1
    
    # キーワードの取得
    keywords = list()
    for member in database[project]["members"]:
        for skill in member["skills"].split(", "):
            if skill not in keywords:
                keywords.append(skill)
    keywords = str(keywords).replace("[", "").replace("]", "").replace("'", "")
    message = "Select a keyword for '" + str(data.description) + "' from: " + keywords
    
    # # ChatGPT処理
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": "Answer in only 1 word"}, {"role": "user", "content": message}],
    }    
    response = requests.post(CHATGPT_API_URL, headers=headers, json=payload)
    response = response.json()["choices"]
    available_member = {}
    if response:
        prediction = str(response[0]["message"]["content"]).translate(str.maketrans('', '', string.punctuation))
        
        for member in database[project]["members"]:
            if str(prediction) in member["skills"]:
                available_member[member["id"]] = member["task_count"]
        available_member = sorted(available_member, reverse=True)
        database[project]["members"][int(available_member[0]) - 1]["task_count"] += 1
    else:
        prediction = "Not applicable"
    
    # データベースへの書き込み
    id = int(len(database[project]["tasks"])) + 1
    database[project]["tasks"].append({'id': id, 'title': data.title, 'description': data.description, 'assign_member': int(available_member[0])})
    firebase.write_database(FIREBASE, database)
    
    return {"description": data.description, "prediction": str(database[0]["tasks"]), "assign_member": int(available_member[0])}

# Memberの変更を処理する
@app.post("/member")
def get_member_data(data: Member):
    # Firebase からデータベースの取得
    database = firebase.get_database(FIREBASE)
    project = int(data.project_id) - 1
    
    # データベースへの書き込み
    id = int(len(database[project]["members"])) + 1
    database[project]["members"].append({'id': id, 'name': data.name, 'skills': data.skills, 'task_count': 0})
    # firebase.write_database(FIREBASE, database)

# Databaseの確認
@app.get("/database")
def get_cloud_database():
    return firebase.get_database(FIREBASE)