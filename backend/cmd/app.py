from flask import Flask,request,jsonify
from flask_cors import CORS
import sys
import os
import bcrypt
import base64

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config.config import LoadConfig
from config.MongoConfig import MongoConnect
from models.UserModel import UserModel
def main():
    config = LoadConfig()
    mongoDB = MongoConnect(config["MongoUsername"],config["MongoPassword"],config["MongoHost"],config["MongoPort"],config["MongoDB"],config["MongoCollection"])
    model = UserModel(mongoDB)
    
    app = Flask(__name__)
    CORS(app) 
    
    @app.route('/api/preferences', methods=['GET'])
    def getPreferences():
        
        data=model.GetUserById("67fa392ab2952543f36136b7")
        
        if isinstance(data, dict) and "error" in data:
            return jsonify({
                "status_code":500,
                "message":"Failed Retive User Preference Data",
                "error":data["error"]
                }),500
            
            
        if data is None:
            return jsonify({
                "status_code":404,
                "message":"Failed Retive User Preference Data",
                "error":"User Preference Data Is Not Found"
                }),404
                    
        return jsonify(result ={
            "status_code":200,
            "message":"Success Retive User Preference Data",
            "payload":data["preferences"]
        }),200
    
    
    @app.route("/api/preferences",methods=["POST"])
    def savePreferences():
        updated_data=model.SaveNewPreferences("67fa392ab2952543f36136b7",request.get_json())
        
        if isinstance(updated_data, dict) and "error" in updated_data:
            return jsonify({
                "status_code":500,
                "message":"Failed Update User Preference Data",
                "Failed":updated_data["error"]
            }),500
        
        
        if updated_data == 0 :
            return jsonify({
                "status_code":404,
                "message":"Failed Update User Preference Data",
                "Failed":"User Is Not Found"
            }),404
            
        
        return jsonify({
            "status_code":201,
            "message":"Success Update User Preference Data"
        }),201
        
  
    @app.route("/api/register",methods=["POST"])
    def Register():
        data=request.get_json()
        username=data["username"]
        password=data["password"]
        
        if username =="" or username is None:
            return jsonify({
                "status_code":400,
                "message":"Failed Login",
                "error":"username is null"
            }),400
            
        if password =="" or password is None:
            return jsonify({
                "status_code":400,
                "message":"Failed Login",
                "error":"password is null"
                }),400
            
      
        userExisting = model.GetUserByUsername(username)
        
        if userExisting is not None :
            return jsonify({
                "status_code":400,
                "message":"Failed Login",
                "error":"User is Exist Please Change Your Username "
                }),400
      
        new_user ={
            "username":username,
            "password":base64.b64encode(bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())).decode('utf-8'),
            "preferences":{
                "theme": "light",
                "language": "english",
                "notification": False
            }
        }    
        
        inserted_user=model.insertNewUser(new_user)
        if isinstance(inserted_user, dict) and "error" in inserted_user:
            return jsonify({
                "status_code":500,
                "message":"Failed Insert New User",
                "error":inserted_user["error"]
                }),400
            
        return jsonify({
            "status_code":201,
            "message":"Successfully Insert New User"
        })
        
        
    @app.route("/api/login",methods=["POST"])    
    def Login():
        data=request.get_json()
        username=data["username"]
        password=data["password"]
        
        if username =="" or username is None:
            return jsonify({
                "status_code":400,
                "message":"Failed Login",
                "error":"username is null"
            }),400
            
        if password =="" or password is None:
            return jsonify({
                "status_code":400,
                "message":"Failed Login",
                "error":"password is null"
                }),400
            
        user = model.GetUserByUsername(username)

        if user is None:
            return jsonify({
                "status_code":404,
                "message":"Failed Login",
                "error":"User Is Not Found"
                }),404 
            
        password_is_correct=bcrypt.checkpw(password, user["password"])
       
        if not password_is_correct:
           return jsonify({
               "status_code":400,
               "message":"Failed Login",
               "password":"Username or Password Is Wrong"
               }),400
           
           
        # implement jwt
        payload = {
            "userId": user["_id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }

        response = make_response(jsonify({
            "status_code":201,
            "message": "Login successful"
            }),201)
        
        response.set_cookie("access_token", token, httponly=True, max_age=3600 )
       
        return response
        
    @app.route("/api/logout",methods=["GET"])    
    def logout():
        response = make_response(jsonify({"message": "Logged out"}))
        response.set_cookie("access_token", "", expires=0)
        return response
        
    
    app.run(host="0.0.0.0", port=config["AppPort"])
    
    
if __name__ == "__main__":
    main()

    
    
    
    
