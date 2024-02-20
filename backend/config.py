from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Specify location of local SQLite db on machine
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
# Do not track all modifications to db
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Instantiate database
db = SQLAlchemy(app)
