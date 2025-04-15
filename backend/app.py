from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
import datetime
from database_config import db
from models import User, Vehicle, Document, Request

app = Flask(__name__)

# Correction de CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/models_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "f85KJHGjgcdjsbjGJHD"
db.init_app(app)

with app.app_context():
    db.create_all()

# Gérer les requêtes OPTIONS pour éviter les erreurs CORS
@app.before_request
def handle_options_request():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS OK"})
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response, 200

# Récupérer tous les véhicules
@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    vehicles_list = [
        {
            "id": v.id,
            "model": v.vehicle_model,
            "price": v.vehicle_price,
            "description": v.vehicle_description,
            "availability": v.vehicle_availability,
            "image": v.vehicle_image,
            "option": v.option
        }
        for v in vehicles
    ]
    return jsonify(vehicles_list), 200

# Ajouter un véhicule
@app.route('/api/vehicles', methods=['POST'])
def add_vehicle():
    try:
        data = request.get_json()
        availability_bool = data.get('availability', "true") in ["true", True, 1]

        new_vehicle = Vehicle(
            vehicle_model=data['model'],
            vehicle_price=int(data['price']),
            vehicle_description=data.get('description', ""),
            vehicle_availability=availability_bool,
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

# Récupérer un véhicule spécifique
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

# Supprimer un véhicule
@app.route('/api/vehicles/<int:vehicle_id>', methods=['DELETE'])
def delete_vehicle(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)
    if vehicle:
        db.session.delete(vehicle)
        db.session.commit()
        return jsonify({"message": "Véhicule supprimé avec succès"}), 200
    else:
        return jsonify({"error": "Véhicule non trouvé"}), 404

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get("name", "").strip()
    lastname = data.get("lastname", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not name or not lastname or not email or not password:
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Cet email est déjà utilisé"}), 400

    new_user = User(name=name, lastname=lastname, email=email, password=password, role="user")  # ✅ Stocke le mot de passe en clair
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Inscription réussie"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        user = User.query.filter_by(email=email).first()
        if not user or user.password != password:  # 🔹 Vérifie le mot de passe en clair
            return jsonify({"error": "Email ou mot de passe incorrect"}), 401

        token = jwt.encode({
            "id": user.id,
            "role": user.role,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, str(app.config['SECRET_KEY']), algorithm="HS256")

        return jsonify({"token": token, "role": user.role, "username": user.name}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Ajouter une demande à la base de données
@app.route('/api/request', methods=['POST'])
def request_vehicle():
    try:
        data = request.get_json()
        print("Requête reçue:", data)

        # Vérifier si le véhicule existe
        vehicle = Vehicle.query.get(data.get('vehicle_id'))
        if not vehicle:
            return jsonify({"error": "Véhicule non trouvé"}), 404

        # Vérifier si l'utilisateur existe (si nécessaire)
        user = User.query.filter_by(email=data.get('email')).first()
        if not user:
            return jsonify({"error": "Utilisateur non trouvé"}), 404

        new_request = Request(
            user_id=user.id,  # Stocke l'ID utilisateur
            vehicle_id=data.get('vehicle_id'),
            request_type=data.get('type', ""),
            status="en attente",
            message=data.get('message', ""),
            date=datetime.datetime.utcnow()
        )

        db.session.add(new_request)
        db.session.commit()

        return jsonify({"message": "Demande enregistrée avec succès"}), 201
    except Exception as e:
        print("Erreur complète :", e)  # <-- Afficher l'erreur complète
        return jsonify({"error": str(e)}), 500


@app.route('/api/dossiers', methods=['GET'])
def get_requests():
    try:
        requests = Request.query.all()
        dossiers_list = [
            {
                "id": r.id,
                "client": f"{r.user.name} {r.user.lastname}",  # 🔹 Correction ici
                "vehicle": r.vehicle.vehicle_model,
                "type": r.request_type,  # 🔹 Correction ici : request_type au lieu de type
                "status": r.status
            }
            for r in requests
        ]

        return jsonify(dossiers_list), 200

    except Exception as e:
        print("Erreur complète :", e)
        return jsonify({"error": str(e)}), 500


# Mettre à jour le statut d'une demande
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)