from database_config import db
import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)  # 🔹 Stocke le mot de passe en clair
    role = db.Column(db.String(20), nullable=False, default="user")

    def __repr__(self):
        return f"User('{self.name}', '{self.lastname}', '{self.email}', '{self.role}')"

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_model = db.Column(db.String(120), nullable=False)
    vehicle_price = db.Column(db.Integer, nullable=False)
    vehicle_description = db.Column(db.String(256), nullable=True)
    vehicle_availability = db.Column(db.Boolean, default=True)  # ✅ Par défaut disponible
    vehicle_image = db.Column(db.String(512), nullable=True)
    option = db.Column(db.String(10), nullable=False, default="rent")  # ✅ Location ou Vente

    def __repr__(self):
        return f"Vehicle('{self.vehicle_model}', '{self.vehicle_price}', '{self.option}')"

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('documents', lazy=True))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)
    vehicle = db.relationship('Vehicle', backref=db.backref('documents', lazy=True))
    content = db.Column(db.String(256), nullable=True)  # 🔹 Lien vers un fichier PDF ou texte
    date = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f"Document('{self.user_id}', '{self.vehicle_id}', '{self.date}')"

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('requests', lazy=True))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)
    vehicle = db.relationship('Vehicle', backref=db.backref('requests', lazy=True))
    request_type = db.Column(db.String(10), nullable=False)  # "rent" ou "buy"
    status = db.Column(db.String(20), nullable=False, default="pending")  # "pending", "approved", "rejected"
    message = db.Column(db.String(500), nullable=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f"Request('{self.user_id}', '{self.vehicle_id}', '{self.request_type}', '{self.status}')"
