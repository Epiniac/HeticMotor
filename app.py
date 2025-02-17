from flask import Flask, render_template # type: ignore
from database_config import app, db
from models import User, Vehicle, Document

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = None #TODO
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
