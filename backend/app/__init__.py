from flask import Flask
from flask_cors import CORS
from app.routes import employee
from .extensions import db


app = Flask(__name__)
CORS(app, origins="https://intellisqr-assignment.vercel.app",)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
db.init_app(app)
# app.app_context().push()
app.register_blueprint(employee.bp)

@app.route("/")
def start():
     return "The server is running!"

