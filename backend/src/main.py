from typing import Optional
from flask import Flask, make_response, request, jsonify, Request, Response
from flask_cors import CORS, cross_origin
from src.db_helper import close_db
from src.methods import recommend_tracks, search_tracks, get_general_info, get_audio_features, get_top_playlists, get_playlist_tracks
import logging
import os


def create_app():
    setup_logging()

    app = Flask(__name__)
    CORS(app, origins="*")

    @app.teardown_appcontext
    def cleanup(exception):
        close_db()

    @app.route("/db-demo")

    @app.route("/search-tracks")
    @cross_origin(origin='localhost', headers=['Content-Type'])
    def search_tracks_endpoint():
        query = request.args.get("query")
        if query is None:
            return make_response(jsonify({"error": "query must be a URL parameter"}), 400)
        # TODO: remove when fallback songs are added
        if len(query) == 0:
            return make_response(jsonify({"error": "query must not be empty"}), 400)
        return search_tracks(query)

    @app.route("/recommend-tracks", methods=['POST'])
    def recommend_tracks_endpoint():
        """
        Get recommended tracks for a list of track uris
        Preconditions:
        - POST body must be JSON
        - POST body must be a List[str] containing 1-5 "track_uri"s
        """
        error_res = __verify_list(request, 1, 5)
        if error_res is None:
            return recommend_tracks(request.json["data"])
        else:
            return error_res
    
    @app.route("/recommend-playlist-tracks", methods=['POST'])
    def recommend_playlist_tracks_endpoint():
        """
        Get recommended tracks for a list of track uris. Similar to /recommend-tracks but
        allows an arbitrary (any) number of track_uris as input.

        Preconditions:
        - POST body must be JSON
        - POST body must be a "playlist_uri" str
        """
        if request.headers.get('Content-Type') != 'application/json':
            return make_response(jsonify({"error": "content_type must be application/json"}), 400)
        if "data" not in request.json:
            return make_response(jsonify({"error": "request body must contain a data field"}), 400)
        data = request.json["data"]
        if not isinstance(data, str):
            return make_response(jsonify({"error": f"data must be a playlist_uri string"}), 400)
        
        return get_playlist_tracks(data)

    @app.route("/general-info")
    def get_general_info_endpoint():
        """
        Get general track information for a list of track_uris.
        Preconditions:
        - GET body must be JSON.
        - GET body must be a List[str] with 1 <= length <= 50
        """
        error_res = __verify_list(request, 1, 50)
        if error_res is None:
            return get_general_info(request.json["data"])
        else:
            return error_res
    
    @app.route("/audio-features", methods=['POST'])
    def get_audio_features_endpoint():
        """
        Get audio features for a list of track_uris.
        Preconditions:
        - GET body must be JSON.
        - GET body must be a List[str] with 1 <= length <= 100
        """
        error_res = __verify_list(request, 1, 100)
        if error_res is None:
            return get_audio_features(request.json["data"])
        else:
            return error_res
    
    @app.route("/get-top-playlists")
    def get_top_playlists_endpoint():
        """
        Get the top playlists.
        """
        return get_top_playlists()
    
    def __verify_list(request: Request, min_len: Optional[int], max_len: Optional[int]) -> Optional[Response]:
        """
        Verify that the given request contains data in the form of a list of min_len to max_len items.
        Preconditions:
        - request is a valid Request object
        - min_len <= max_len
        Postconditions:
        - returns an error response with the corresponding message and status code if verification fails
        - returns None if verification succeeds
        """
        if request.headers.get('Content-Type') != 'application/json':
            return make_response(jsonify({"error": "content_type must be application/json"}), 400)
        
        if "data" not in request.json:
            return make_response(jsonify({"error": "request body must contain a data field"}), 400)
        
        data = request.json["data"]
        if not isinstance(data, list) or (min_len is not None and len(data) < min_len) or (max_len is not None and len(data) > max_len):
            min_str = 0 if min_len is None else min_len
            max_str = "N/A" if max_len is None else max_len
            return make_response(jsonify({"error": f"data must be a list of {min_str}-{max_str} track_uris"}), 400)
        
        return None

    return app


def setup_logging():
    """
    Setup logging for this project.
    - This function needs to be called before creating the app object.
    - Logs will be written to standard output AND a logfile.
    - DEBUG level messages will be ignored in production mode.

    Preconditions:
    - Must be called before the first call to Flask(__name__).
    """
    with open("logfile", 'w+') as file:
        file.truncate(0)
    message_format = "%(asctime)s %(levelname)s in %(module)s: %(message)s"
    is_debug = os.environ.get("FLASK_DEBUG") == "1"
    logging.basicConfig(filename="logfile", format=message_format, level=logging.DEBUG if is_debug else logging.INFO)
    logging.getLogger().addHandler(logging.StreamHandler())
