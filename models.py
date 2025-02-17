from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    lastname = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), unique=True, nullable=False)

    def __repr__(self):
        return f"User ('{self.name}','{self.lastname}', '{self.email}','{self.role}')"

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_model = db.Column(db.String(120), nullable=False)
    vehicle_price = db.Column(db.Integer, nullable=False)
    vehicle_description = db.Column(db.String(256), nullable=True)
    vehicle_availability = db.Column(db.Boolean)
    vehicle_image = db.Column(db.String(512), nullable=True)

    def __repr__(self):
        return f"Vehicle('{self.vehicle_model}', '{self.vehicle_price}', '{self.vehicle_availability}')"

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User ', backref=db.backref('documents', lazy=True))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)
    vehicle = db.relationship('Vehicle ', backref=db.backref('documents', lazy=True))
    content = db.Column(db.String(256), nullable=True)
    date = db.Column(db.String(20), nullable=True)