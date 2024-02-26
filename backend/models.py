from config import db

class Credential(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    web_name = db.Column(db.String(80), unique = False, nullable = False)
    user_name = db.Column(db.String(80), unique = False, nullable = False)
    password = db.Column(db.String(80), unique = False, nullable = False)
    
    def to_json(self):
        return {
            "id": self.id,
            "webName": self.web_name,
            "userName": self.user_name,
            "password": self.password
        }
    