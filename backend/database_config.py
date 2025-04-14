from flask_sqlalchemy import SQLAlchemy

from flask import Flask

import os

from dotenv import load_dotenv


load_dotenv() 


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

