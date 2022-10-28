import requests
from flask import Response, jsonify, make_response
from typing import List
from src.spotify_helper import get_access_token, get_tracks


def recommend_tracks(track_uris: List[str]) -> Response:
    access_token = get_access_token()
    if access_token is None:
        return make_response(jsonify([]), 401)  # unauthorized

    # TODO: pass track_uris to ML script and get back a list of recommendations
    # for now, use these 2 arbitrary track_uris as mock
    recommended_track_uris = [
        "0UaMYEvWZi0ZqiDOoHU3YI", "6I9VzXrHxO9rA9A5euc8Ak"]

    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"ids": ",".join(recommended_track_uris)}
    response = requests.get(
        "https://api.spotify.com/v1/tracks", headers=headers, params=params)

    tracks = get_tracks(response.json()["tracks"])

    ret_res = make_response(jsonify(tracks), response.status_code)
    ret_res.headers["Content-Type"] = "application/json"
    return ret_res


def search_tracks(query: str) -> Response:
    access_token = get_access_token()
    if access_token is None:
        return make_response(jsonify([]), 401)  # unauthorized

    headers = {"Authorization": f"Bearer {access_token}"}

    if len(query) == 0:
        # TODO: get list of 10 songs we want to show by default
        # params = {"type": "track", "limit": 10}
        return make_response(jsonify([]), 200)
    params = {"q": query, "type": "track", "limit": 10}
    response = requests.get(
        "https://api.spotify.com/v1/search", headers=headers, params=params)

    tracks = get_tracks(response.json()["tracks"]["items"])
    ret_res = make_response(jsonify(tracks), response.status_code)
    ret_res.headers["Content-Type"] = "application/json"
    return ret_res
