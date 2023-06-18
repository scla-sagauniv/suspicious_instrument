import requests
import firebase
import string
from fastapi import FastAPI
from pydantic import BaseModel
import json

CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"
FIREBASE = firebase.init_database()

with open("api.json", "r") as file:
    OPENAI_API_KEY = json.load(file)["api"]

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
    
class Project(BaseModel):
    name: str
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
                for i, member in enumerate(database[project]["members"]):
                    if member["id"] == int(available_member[0]):
                        available_member = [member["id"], member["name"]]
                        database[project]["members"][i]["task_count"] += 1
        else:
            available_member = {member["id"]: member["task_count"] for member in database[project]["members"]}
            available_member = sorted(available_member, reverse=True)
            for i, member in enumerate(database[project]["members"]):
                if member["id"] == int(available_member[0]):
                    available_member = [member["id"], member["name"]]
                    database[project]["members"][i]["task_count"] += 1
        ids = list(range(1, len(database[project]["tasks"]) + 2))
        ids = [id for id in ids if id not in [task["id"] for task in database[project]["tasks"]]]
        database[project]["tasks"].append({'id': ids[0], 'title': data.title, 'description': data.description, 'assign_member': available_member[0], 'assign_member_name': available_member[1]})
    elif data.method == "remove":
        member_id = None
        for i, task in enumerate(database[project]["tasks"]):
            if task["title"] == data.title and task["description"] == data.description:
                database[project]["tasks"].pop(i)
                member_id = task["assign_member"]
        for i, member in enumerate(database[project]["members"]):
            if member["id"] == int(member_id):
                database[project]["members"][i]["task_count"] -= 1
    else:
        pass
    
    firebase.write_database(FIREBASE, database)
    # return {"debug": available_member}
    
@app.post("/member")
def update_member(data: Member):
    database = firebase.get_database(FIREBASE)
    project = int(data.project_id) - 1
    
    if data.method == "add":
        ids = list(range(1, len(database[project]["members"]) + 2))
        ids = [id for id in ids if id not in [member["id"] for member in database[project]["members"]]]
        database[project]["members"].append({'id': ids[0], 'name': data.name, 'skills': data.skills, 'task_count': 0})
    elif data.method == "remove":
        member_id = None
        for i, member in enumerate(database[project]["members"]):
            if member["name"] == data.name and member["skills"] == data.skills:
                database[project]["members"].pop(i)
                member_id = member["id"]
        for i, task in enumerate(database[project]["tasks"]):
            if task["assign_member"] == int(member_id):
                database[project]["tasks"][i]["assign_member"] = 0
    else:
        pass
    
    firebase.write_database(FIREBASE, database)
    
@app.post("/project")
def update_member(data: Project):
    database = firebase.get_database(FIREBASE)
    
    if data.method == "add":
        ids = list(range(1, len(database) + 2))
        ids = [id for id in ids if id not in [project["id"] for project in database]]
        database.append({'id': ids[0], 'name': data.name, 'members': [], 'tasks': []})
    elif data.method == "remove":
        for i, project in enumerate(database):
            if project["name"] == data.name:
                database.pop(i)
    else:
        pass
    
    firebase.write_database(FIREBASE, database)       

@app.get("/database")
def get_cloud_database():
    return firebase.get_database(FIREBASE)