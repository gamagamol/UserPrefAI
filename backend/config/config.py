import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

def LoadConfig():
    return {
        "MongoHost":os.getenv("MONGO_HOST"),
        "MongoPort":int(os.getenv("MONGO_PORT")),
        "MongoDB":os.getenv("MONGO_DB"),
        "MongoCollection":os.getenv("MONGO_COLLECTION"),
        "MongoUsername":os.getenv("MONGO_USERNAME"),
        "MongoPassword":os.getenv("MONGO_PASSWORD"),
        "AppPort":int(os.getenv("APP_PORT")),
        "SecretKey":os.getenv("SECRET_KEY")
    }

