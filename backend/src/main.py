from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin
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
    @cross_origin()
    def query_db():
        response = make_response(db_demo(), 200)
        response.headers["Content-Type"] = "application/json"
        return response

    @app.route("/recommend-tracks", methods=['POST'])
    @cross_origin()
    def recommend_tracks_endpoint():
        """
        Get recommended tracks for a list of track uris

        Preconditions:
        - POST body must be JSON
        - POST body must be a List[str] containing 1-5 "track_uris"
        """
        if request.headers.get('Content-Type') != 'application/json':
            return make_response(jsonify({"error": "content_type must be application/json"}), 400)

        if "data" not in request.json:
            return make_response(jsonify({"error": "POST data must include `data` field"}), 400)

        track_uris = request.json["data"]
        if (isinstance(track_uris, list) and len(track_uris) > 0 and len(track_uris) <= 5):
            return recommend_tracks(track_uris)
        else:
            return make_response(jsonify({"error": "data must be a list of 1-5 track_uris"}), 400)

    return app
