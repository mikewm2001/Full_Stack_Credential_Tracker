from config import db

# Represent the database instances as a python class
class Credential(db.Model):
    # Define unique id field and other credential fields
    id = db.Column(db.Integer, primary_key = True)
    web_name = db.Column(db.String(80), unique = False, nullable = False)
    user_name = db.Column(db.String(80), unique = False, nullable = False)
    password = db.Column(db.String(80), unique = False, nullable = False)
    
    # Convert class objects to json objects
    def to_json(self):
        return {
            "id": self.id,
            "webName": self.web_name,
            "userName": self.user_name,
            "password": self.password
        }
    