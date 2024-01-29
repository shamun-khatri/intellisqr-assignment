from flask import Flask
from flask_cors import CORS
from app.routes import employee
from .extensions import db


app = Flask(__name__)
CORS(app, origins=["https://intellisqr-assignment.vercel.app", "http://localhost:5173"],)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/intellisqr_assignment'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://default:so5AiZXB8yPt@ep-restless-art-a14rj2v3.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb'
db.init_app(app)
# app.app_context().push()

with app.app_context():
     db.create_all()

app.register_blueprint(employee.bp)

@app.route("/")
def start():
     return "The server is running!"
