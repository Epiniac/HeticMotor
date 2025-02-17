from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    pass

class Vehicle(db.Model):
    pass

class Document(db.Model):
    pass