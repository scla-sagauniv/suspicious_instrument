import requests
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class InputData(BaseModel):
    name: str
    description: str
    label: str

DB: List[InputData] = [
    InputData(name="Task01", description="Teach junior about programming", label="Teach"),
    InputData(name="Task02", description="Learn about programming", label="Learn"),
]

CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_API_KEY = "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"

def send_message_to_chatgpt(message):
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": message}],
    }
    response = requests.post(CHATGPT_API_URL, headers=headers, json=payload)
    return response.json()

@app.post("/data")
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

@app.get("/")
def read_root():
    return DB