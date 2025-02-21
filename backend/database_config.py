from flask import Flask

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://dbmasteruser:hetic123@ls-0fc3236d441f5341363a71a9c5e962a6de247ecc.cd1vbmeqzor2.eu-west-3.rds.amazonaws.com/m_motors_db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
