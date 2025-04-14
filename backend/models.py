from flask_sqlalchemy import SQLAlchemy

from database_config import db

import datetime


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(80), nullable=False)

    lastname = db.Column(db.String(80), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password = db.Column(db.String(256), nullable=False)  

    role = db.Column(db.String(20), nullable=False, default="user")


    def __repr__(self):

        return f"User('{self.name}', '{self.lastname}', '{self.email}', '{self.role}')"



class Vehicle(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    vehicle_model = db.Column(db.String(120), nullable=False)

    vehicle_price = db.Column(db.Integer, nullable=False)

    vehicle_description = db.Column(db.String(256), nullable=True)

    vehicle_availability = db.Column(db.Boolean, default=True)

    vehicle_image = db.Column(db.String(512), nullable=True)

    option = db.Column(db.String(10), nullable=False, default="rent")


    def __repr__(self):

        return f"Vehicle('{self.vehicle_model}', '{self.vehicle_price}', '{self.option}')"



class Document(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('documents', lazy=True))

    request_id = db.Column(db.Integer, db.ForeignKey('request.id'), nullable=False)

    request = db.relationship('Request', backref=db.backref('documents', lazy=True))

    document_url = db.Column(db.String(512), nullable=True)

    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    def __repr__(self):

        return f"Document(User: {self.user_id}, Request: {self.request_id})"



class Request(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)

    request_type = db.Column(db.String(10), nullable=False)

    status = db.Column(db.String(20), default="en attente", nullable=False)

    message = db.Column(db.String(500), nullable=True)

    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    user = db.relationship('User', backref=db.backref('requests', lazy=True))

    vehicle = db.relationship('Vehicle', backref=db.backref('requests', lazy=True))


    def __repr__(self):

        return f"Request('{self.id}', Type: {self.request_type}, Status: {self.status})"

