import requests
import firebase
import string
from fastapi import FastAPI
from pydantic import BaseModel

CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_API_KEY = "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"
FIREBASE = firebase.init_database()

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

# Taskの変更を処理する
@app.post("/task")
def update_task(data: Task):
    database = firebase.get_database(FIREBASE)
    project = int(data.project_id) - 1
    
    if data.method == "add":
        keywords = list(set([skill for member in database[project]["members"] for skill in member["skills"].split(", ")]))
        message = f"Select 1 keyword for '{data.description}' from the following : {', '.join(keywords)}"

        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "system", "content": "Answer in only 1 word"}, {"role": "user", "content": message}],
        }    
        response = requests.post(CHATGPT_API_URL, headers=headers, json=payload).json()["choices"]
        available_member = {}
        if response:
            prediction = str(response[0]["message"]["content"]).translate(str.maketrans("", "", string.punctuation.replace("+", "")))
            available_member = {member["id"]: member["task_count"] for member in database[project]["members"] if prediction in member["skills"]}
            
            if available_member:
                available_member = sorted(available_member, reverse=True)
                for i, member in enumerate(database[project]["members"], 1):
                    if member["id"] == int(available_member[0]):
                        database[project]["members"][i]["task_count"] += 1
        else:
            prediction = "Not applicable"
        
        ids = list(range(1, len(database[project]["tasks"]) + 2))
        ids = [id for id in ids if id not in [task["id"] for task in database[project]["tasks"]]]
        database[project]["tasks"].append({'id': ids[0], 'title': data.title, 'description': data.description, 'assign_member': int(available_member[0])})
        
        # return {"description": data.description, "prediction": prediction, "assign_member": int(available_member[0])}
    else:
        member_id = None
        for i, task in enumerate(database[project]["tasks"]):
            if task["title"] == data.title and task["description"] == data.description:
                database[project]["tasks"].pop(i)
                member_id = task["assign_member"]
        for i, member in enumerate(database[project]["members"]):
            if member["id"] == int(member_id):
                database[project]["members"][i]["task_count"] -= 1
    
    firebase.write_database(FIREBASE, database)
    
# Memberの変更を処理する
@app.post("/member")
def update_member(data: Member):
    database = firebase.get_database(FIREBASE)
    project = int(data.project_id) - 1
    
    if data.method == "add":
        
        ids = list(range(1, len(database[project]["members"]) + 2))
        ids = [id for id in ids if id not in [member["id"] for member in database[project]["members"]]]
        database[project]["members"].append({'id': ids[0], 'name': data.name, 'skills': data.skills, 'task_count': 0})
    else:
        member_id = None
        for i, member in enumerate(database[project]["members"]):
            if member["name"] == data.name and member["skills"] == data.skills:
                database[project]["members"].pop(i)
                member_id = member["id"]
        for i, task in enumerate(database[project]["tasks"]):
            if task["assign_member"] == int(member_id):
                database[project]["tasks"][i]["assign_member"] = None
    
    firebase.write_database(FIREBASE, database)                

# Databaseの確認
@app.get("/database")
def get_cloud_database():
    return firebase.get_database(FIREBASE)