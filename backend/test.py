import json

database = json.load(open("./sample/database.json"))[0]
keywords = list()

for member in database["members"]:
    for skill in member["skills"].split(", "):
        if skill not in keywords:
            keywords.append(skill)
            print(keywords)