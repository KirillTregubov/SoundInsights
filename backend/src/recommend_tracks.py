import requests
from flask import Response, jsonify, make_response
from typing import List
from src.spotify_helper import get_access_token


def recommend_tracks(track_uris: List[str]) -> Response:
    access_token = get_access_token()
    if access_token is None:
        return make_response(jsonify([]), 401) # unauthorized

    # TODO: pass track_uris to ML script and get back a list of recommendations
    # for now, use these 2 arbitrary track_uris as mock
    recommended_track_uris = ["0UaMYEvWZi0ZqiDOoHU3YI", "6I9VzXrHxO9rA9A5euc8Ak"]

    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"ids": ",".join(recommended_track_uris)}
    response = requests.get("https://api.spotify.com/v1/tracks", headers=headers, params=params)

    tracks = []
    if response.status_code == 200:
        for track in response.json()["tracks"]:
            images = track["album"]["images"]
            image_url = None if len(images) == 0 else images[0]["url"] # first image is the largest one
            tracks.append({
                "name": track["name"],
			    "artists": list(map(lambda artist: artist["name"], track["artists"])),
                "image_url": image_url
            })

    ret_res = make_response(jsonify(tracks), response.status_code)
    ret_res.headers["Content-Type"] = "application/json"
    return ret_res
