from database_config import db, app

from models import User


with app.app_context():

    user = User(name="Alice", lastname="Smith", email="alice@example.com", password="securepassword", role="user")

    db.session.add(user)

    db.session.commit()

    print("Utilisateur ajouté avec succès !")

