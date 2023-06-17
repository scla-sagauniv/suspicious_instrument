import requests
from fastapi import FastAPI
from pydantic import BaseModel
import json
import firebase

URL = "https://api.openai.com/v1/chat/completions"
KEY = ""

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

with open ("./sample/database.json") as jsondata:
    database = json.load(jsondata)[0]
    keywords = list()

for member in database["members"]:
    for skill in member["skills"].split(", "):
        if skill not in keywords:
            keywords.append(skill)

def send_message_to_chatgpt(message):
    headers = {
        "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": message}],
    }
    response = requests.post(URL, headers=headers, json=payload)
    return response.json()


@app.post("/task")
def receive_data(data: Task):
    firebase_db = firebase.init_database()
    database = firebase.get_database(firebase_db)
    
    for member in database["members"]:
        for skill in member["skills"].split(", "):
            if skill not in keywords:
                keywords.append(skill)
    
    headers = {"Authorization": f"Bearer {KEY}", "Content-Type": "application/json",}
    message = "Select a suitable keyword for '" + str(data.description) + "' from: " + str(keywords)
    payload = {"model": "gpt-3.5-turbo", "messages": [{"role": "system", "content": "Answer in only 1 word"}, {"role": "user", "content": message}]}
    response = requests.post(URL, headers=headers, json=payload)
    response = response.json()["choices"]
    if response:
        prediction = response[0]["message"]["content"]
        available_member = {}
        
        for member in database["members"]:
            if str(skill) in member["skills"]:
                available_member[data.id] = data
    else:
        prediction = "Not applicable"
        
    database["tasks"].append({'id': data.id, 'title': data.title, 'description': data.description, 'assign_member': assign})
    
    return {"description": data.description, "assign_member": assign}

@app.post("/member")
def receive_data(data: InputData):
    received_data = data.name
    received_description = data.description

    chatgpt_response = send_message_to_chatgpt(received_description)
    choices = chatgpt_response["choices"]
    if choices:
        label = choices[0]["message"]["content"]
        data.label = label
    else:
        data.label = "No response from ChatGPT"
    DB.append(InputData(name=received_data, description=received_description, label=data.label))
    
    return {"data": received_data, "description": received_description, "label": data.label}

@app.get("/database")
def read_root():
    return database