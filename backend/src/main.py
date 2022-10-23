from flask import Flask, make_response, request
from flask_cors import CORS
from src.db_demo import db_demo
from src.db_helper import close_db
from src.recommend_tracks import recommend_tracks


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
    
    @app.route("/recommend-tracks", methods = ['POST'])
    def recommend_tracks_endpoint():
        track_uris = request.form.getlist("data")
        return recommend_tracks(track_uris)

    return app
