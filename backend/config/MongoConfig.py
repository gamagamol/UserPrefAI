from pymongo import MongoClient

def MongoConnect(username,password,host , port,db,collection):
    return MongoClient(f"mongodb://{username}:{password}@{host}:{port}/")[db][collection]
    