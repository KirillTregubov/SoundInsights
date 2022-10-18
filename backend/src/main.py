from flask import Flask, make_response
from flask_cors import CORS
from src.db_demo import db_demo
from src.db_helper import close_db


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.teardown_appcontext
    def cleanup(exception):
        close_db()

    @app.route("/db-demo")
    def query_db():
        response = make_response(db_demo(), 200)
        response.headers["Content-Type"] = "application/json"
        return response

    return app
