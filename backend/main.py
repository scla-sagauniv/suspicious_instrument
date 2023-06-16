from typing import Union, List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Person(BaseModel):
    id: int
    name: str
    age: str

DB: List[Person] = [
    Person(id=1, name="NAME", age="AGE")
]

@app.get("/api")
def read_root():
    return DB