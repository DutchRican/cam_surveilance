import json


def LoadConfig():
    with open('config.json') as data_file:
        data = json.loads(data_file.read())
    return data
