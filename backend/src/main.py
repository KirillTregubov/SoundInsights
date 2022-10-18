from flask import Flask, make_response, jsonify
from flask_cors import CORS
from db_demo import db_demo
from db_helper import close_db

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.teardown_appcontext
    def cleanup(exception):
        close_db()

    @app.route("/")
    def hello_world():
        response = make_response(jsonify({"message": "Hello, World!"}), 200)
        response.headers["Content-Type"] = "application/json"
        return response

    @app.route("/db-demo")
    def query_db():
        response = db_demo()
        response.headers["Content-Type"] = "application/json"
        return response
    
    return app
