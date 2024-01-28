from flask import Flask
from flask_cors import CORS
from app.routes import employee
from .extensions import db

def create_app():
    app = Flask(__name__)
    CORS(app, origins="http://localhost:5173")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
    db.init_app(app)
    # app.app_context().push()
    app.register_blueprint(employee.bp)

    return app

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", debug=True)
