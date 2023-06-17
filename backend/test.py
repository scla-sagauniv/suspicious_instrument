import json
from pydantic import BaseModel

database = json.load(open("./sample/database.json"))[0]
keywords = list()

for member in database["members"]:
    for skill in member["skills"].split(", "):
        if skill not in keywords:
            keywords.append(skill)
            
        
database["members"].append({'id': 4, 'name': 'Kawata Gotou', 'skills': 'React, Firebase', 'task_count': 2})

print(len(database["members"][3]))