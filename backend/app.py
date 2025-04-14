from flask import Flask, jsonify, request

from flask_cors import CORS

from flask_migrate import Migrate

from flask_sqlalchemy import SQLAlchemy

from werkzeug.utils import secure_filename

from dotenv import load_dotenv

import jwt

import os

import datetime


from database_config import db

from models import User, Vehicle, Document, Request

from s3_utils import upload_file_to_s3


# Chargement des variables d'environnement

load_dotenv()


app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)


# Configuration Flask

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")

app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialisation DB

db.init_app(app)

migrate = Migrate(app, db)


with app.app_context():

    db.create_all()


@app.before_request

def handle_options_request():

    if request.method == "OPTIONS":

        response = jsonify({"message": "CORS OK"})

        response.headers["Access-Control-Allow-Origin"] = "*"

        response.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"

        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

        return response, 200


# ---------------- ROUTES VEHICULES ----------------


@app.route('/api/vehicles', methods=['GET'])

def get_vehicles():

    vehicles = Vehicle.query.all()

    return jsonify([{

        "id": v.id,

        "model": v.vehicle_model,

        "price": v.vehicle_price,

        "description": v.vehicle_description,

        "availability": v.vehicle_availability,

        "image": v.vehicle_image,

        "option": v.option

    } for v in vehicles]), 200


@app.route('/api/vehicles', methods=['POST'])

def add_vehicle():

    try:

        data = request.get_json()

        new_vehicle = Vehicle(

            vehicle_model=data['model'],

            vehicle_price=int(data['price']),

            vehicle_description=data.get('description', ""),

            vehicle_availability=data.get('availability', "true") in ["true", True, 1],

            vehicle_image=data.get('image', ""),

            option=data.get('option', "rent")

        )

        db.session.add(new_vehicle)

        db.session.commit()


        return jsonify({

            "id": new_vehicle.id,

            "model": new_vehicle.vehicle_model,

            "price": new_vehicle.vehicle_price,

            "description": new_vehicle.vehicle_description,

            "availability": new_vehicle.vehicle_availability,

            "image": new_vehicle.vehicle_image,

            "option": new_vehicle.option

        }), 201

    except Exception as e:

        return jsonify({"error": str(e)}), 500


@app.route('/api/vehicles/<int:vehicle_id>', methods=['GET'])

def get_vehicle(vehicle_id):

    vehicle = Vehicle.query.get(vehicle_id)

    if not vehicle:

        return jsonify({"error": "Véhicule non trouvé"}), 404

    return jsonify({

        "id": vehicle.id,

        "model": vehicle.vehicle_model,

        "price": vehicle.vehicle_price,

        "description": vehicle.vehicle_description,

        "availability": vehicle.vehicle_availability,

        "image": vehicle.vehicle_image,

        "option": vehicle.option

    }), 200


@app.route('/api/vehicles/<int:vehicle_id>', methods=['DELETE'])

def delete_vehicle(vehicle_id):

    vehicle = Vehicle.query.get(vehicle_id)

    if not vehicle:

        return jsonify({"error": "Véhicule non trouvé"}), 404

    db.session.delete(vehicle)

    db.session.commit()

    return jsonify({"message": "Véhicule supprimé"}), 200


# ---------------- AUTH ----------------


@app.route('/api/signup', methods=['POST'])

def signup():

    data = request.get_json()

    if not all(data.get(k) for k in ("name", "lastname", "email", "password")):

        return jsonify({"error": "Tous les champs sont obligatoires"}), 400


    if User.query.filter_by(email=data["email"]).first():

        return jsonify({"error": "Email déjà utilisé"}), 400


    user = User(

        name=data["name"],

        lastname=data["lastname"],

        email=data["email"],

        password=data["password"],

        role="user"

    )

    db.session.add(user)

    db.session.commit()

    return jsonify({"message": "Inscription réussie"}), 201


@app.route('/api/login', methods=['POST'])

def login():

    try:

        data = request.get_json()

        user = User.query.filter_by(email=data.get("email")).first()


        if not user or user.password != data.get("password"):

            return jsonify({"error": "Email ou mot de passe incorrect"}), 401


        token = jwt.encode({

            "id": user.id,

            "role": user.role,

            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)

        }, app.config['SECRET_KEY'], algorithm="HS256")


        return jsonify({

            "token": token,

            "role": user.role,

            "username": user.name

        }), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# ---------------- REQUESTS / DOSSIERS ----------------


@app.route('/api/request', methods=['POST'])

def request_vehicle():

    try:

        email = request.form.get("email")

        vehicle_id = request.form.get("vehicle_id")

        req_type = request.form.get("type")

        message = request.form.get("message", "")


        user = User.query.filter_by(email=email).first()

        if not user:

            return jsonify({"error": "Utilisateur non trouvé"}), 404


        vehicle = Vehicle.query.get(vehicle_id)

        if not vehicle:

            return jsonify({"error": "Véhicule non trouvé"}), 404


        document_url = None

        if "document" in request.files:

            doc_file = request.files["document"]

            if doc_file.filename != "":

                filename = secure_filename(doc_file.filename)

                file_content = doc_file.read()

                content_type = doc_file.content_type

                document_url = upload_file_to_s3(file_content, filename, content_type)


        new_request = Request(

            user_id=user.id,

            vehicle_id=vehicle.id,

            request_type=req_type,

            status="en attente",

            message=message,

            date=datetime.datetime.utcnow()

        )

        db.session.add(new_request)

        db.session.commit()


        if document_url:

            new_doc = Document(

                user_id=user.id,

                request_id=new_request.id,

                document_url=document_url

            )

            db.session.add(new_doc)

            db.session.commit()


        return jsonify({"message": "Demande enregistrée avec succès"}), 201

    except Exception as e:

        return jsonify({"error": str(e)}), 500


@app.route('/api/dossiers', methods=['GET'])

def get_requests():

    try:

        requests = Request.query.all()

        return jsonify([{

            "id": r.id,

            "client": f"{r.user.name} {r.user.lastname}",

            "vehicle": r.vehicle.vehicle_model,

            "type": r.request_type,

            "status": r.status

        } for r in requests]), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500


@app.route('/api/dossiers/<int:request_id>', methods=['PUT'])

def update_request_status(request_id):

    try:

        data = request.get_json()

        request_entry = Request.query.get(request_id)

        if not request_entry:

            return jsonify({"error": "Demande non trouvée"}), 404

        request_entry.status = data.get("status", request_entry.status)

        db.session.commit()

        return jsonify({"message": "Statut mis à jour"}), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500


# ---------------- RUN ----------------


if __name__ == '__main__':

    app.run(debug=True, host="0.0.0.0", port=8000)

