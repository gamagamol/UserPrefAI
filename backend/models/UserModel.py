from bson.objectid import ObjectId

class UserModel:
    def __init__(self,mongo):
        self.mongo=mongo
        
    def GetUserById(self,userId):
        try:
            return self.mongo.find_one({"_id": ObjectId(userId)})
        except Exception as e:
            return {"error": str(e)}
    
    def SaveNewPreferences(self,userId,preferences):
        try:
            result = self.mongo.update_one(
                {"_id": ObjectId(userId)}, 
                {"$set": {"preferences": preferences}}  
            )
            return result.matched_count
        except Exception as e:
            return {"error": str(e)}
        
        
    def GetUserByUsername(self,username):
        try:
            return self.mongo.find_one({"username":username})
        except:
            return {"error":str(e)}
        
    def insertNewUser(self,data):
        try:
            return self.mongo.insert_one(data)
        except:
            return {"error":str(e)}
        