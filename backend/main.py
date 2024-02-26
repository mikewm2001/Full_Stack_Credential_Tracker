from flask import request, jsonify
from config import app, db
from models import Credential

# READ operation
@app.route("/credentials", methods = ["GET"])
def get_credentials():
    # Return the json object associated with this credential object
    credentials = Credential.query.all()
    json_credentials = list(map(lambda x: x.to_json(), credentials))
    return jsonify({"credentials": json_credentials})

# CREATE operation
@app.route("/create_credential", methods = ["POST"])
def create_credential():
    web_name = request.json.get("webName")
    user_name = request.json.get("userName")
    password = request.json.get("password")
    
    # Notify user of invalid input
    if not web_name or not user_name or not password:
        return (
            jsonify({"message": "You must include a web name, user name, and password"}),
            400
        )

    new_credential = Credential(web_name = web_name, user_name = user_name, password = password)
    
    # Add the credential to the database
    try:
        db.session.add(new_credential)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201

# UPDATE operation
@app.route("/update_credential/<int:user_id>", methods = ["PATCH"])
def update_credential(user_id):
    credential = Credential.query.get(user_id)
    
    # Check if the credential exists
    if not credential:
        return jsonify({"message": "User not found"}), 404
    
    # Parse the json data and directly update the values in the database
    data = request.json
    credential.web_name = data.get("webName", credential.web_name)
    credential.user_name = data.get("userName", credential.user_name)
    credential.password = data.get("password", credential.password)
    
    db.session.commit()
    
    return jsonify({"message": "User updated"}), 200

# DELETE operation
@app.route("/delete_credential/<int:user_id>", methods = ["DELETE"])
def delete_credential(user_id):
    credential = Credential.query.get(user_id)
    
    # Check if the credential exists
    if not credential:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(credential)
    db.session.commit()
    
    return jsonify({"message": "User deleted"}), 200

# Run the Flask app    
if __name__ == "__main__":
    
    # Instantiate the database
    with app.app_context():
        db.create_all()
    
    app.run(debug = True)
    