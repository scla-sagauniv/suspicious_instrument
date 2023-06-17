import requests
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import json

URL = "https://api.openai.com/v1/chat/completions"
KEY = ""

app = FastAPI()

class Member(BaseModel):
    id: int
    name: str
    skills: str
    task_count: int
    
class Task(BaseModel):
    id: int
    title: str
    description: str
    assign_member: int

database = json.load(open("./sample/database.json"))[0]
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
    headers = {"Authorization": f"Bearer {KEY}", "Content-Type": "application/json",}
    message = "Select 1 keyword for '" + str(data.description) + "' from: " + str(keywords)
    payload = {"model": "gpt-3.5-turbo", "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": message}]}
    response = requests.post(URL, headers=headers, json=payload)
    response = response.json()["choices"]
    if response:
        skill = response[0]["message"]["content"]
    else:
        skill = "Not applicable"
    
    for member in database["members"]:
    	for skill in member["skills"].split(", "):
            continue
        
    database.append(Task(id=data.id, title=data.title, description=data.description, assign_member=data.assign_member))
    
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