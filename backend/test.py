from database_config import db, app


with app.app_context():

    print("Connexion à la base de données :", db.engine.url)

