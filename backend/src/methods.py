import requests
from flask import Response, jsonify, make_response
from typing import List, Optional
from src.spotify_helper import get_access_token, get_tracks


def recommend_tracks(track_uris: List[str]) -> Response:
    """
    Get recommended tracks for a list of track uris

    Preconditions:
    - track_uris is a list containing >= 1 "track_uris"
    Postconditions:
    - returns a list of 100 recommended "track_uris"
    """
    access_token = get_access_token()
    if access_token is None:
        return make_response(jsonify([]), 401)  # unauthorized

    recommended_track_uris = __recommend_using_ml(track_uris, 2)

    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"ids": ",".join(recommended_track_uris)}
    response = requests.get(
        "https://api.spotify.com/v1/tracks", headers=headers, params=params)

    tracks = get_tracks(response.json()["tracks"])

    ret_res = make_response(jsonify(tracks), response.status_code)
    ret_res.headers["Content-Type"] = "application/json"
    return ret_res


def __recommend_using_ml(track_uris: List[str], max_ml_calls: Optional[int]) -> List[str]:
    segmented = __segment_list(track_uris, 10)
    if len(segmented) == 0:
        return []
    else:
        recommended = []
        num_loops = len(segmented) if max_ml_calls is None else min(len(segmented), max_ml_calls)
        for i in range(num_loops):
            segment = segmented[i]
            # TODO: Run ML model on "segment" and extend the "recommended" list by
            # the first 100 / min(len(segmented), max_ml_calls) items of the list returned by the ML model.
            recommended.extend(["0UaMYEvWZi0ZqiDOoHU3YI", "6I9VzXrHxO9rA9A5euc8Ak"])
        # TODO: assert len(recommended) should be 100
        return recommended


def __segment_list(lst: List, length: int) -> List[List]:
    segmented = []
    current = []
    for item in lst:
        current.append(item)
        if (len(current) == length):
            segmented.append(current)
            current = []
    if len(current) > 0:
        segmented.append(current)
    return segmented


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


def get_general_info(track_uris: List[str]) -> Response:
    """
    Get general information about tracks with the given track_uris.

    Preconditions:
    - 0 <= len(track_uris) <= 50
    Postconditions:
    - Returns a response with general track info.
        - Structure of the response JSON: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-tracks
        - If the request succeeds, the response contains a list of data with length == len(track_uris).
        - If the request fails, the response contains an empty list and a corresponding error status_code.
    """
    access_token = get_access_token()
    if access_token is None:
        return make_response(jsonify([]), 401)
    
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"ids": ",".join(track_uris)}
    response = requests.get("https://api.spotify.com/v1/tracks", headers=headers, params=params)
    
    ret_res = make_response(
        jsonify(response.json()["tracks"] if response.status_code == 200 else []),
        response.status_code
    )
    ret_res.headers["Content-Type"] = "application/json"
    return ret_res


def get_audio_features(track_uris: List[str]) -> Response:
    """
    Get audio features of the tracks with the given track_uris.

    Preconditions:
    - 0 <= len(track_uris) <= 100
    Postconditions:
    - Returns a response with track audio features.
        - Structure of the response JSON: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
        - If the request succeeds, the response contains a list of data with length == len(track_uris).
        - If the request fails, the response contains an empty list and a corresponding error status_code.
    """
    access_token = get_access_token()
    if access_token is None:
        return make_response(jsonify([]), 401)
    
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"ids": ",".join(track_uris)}
    response = requests.get("https://api.spotify.com/v1/audio-features", headers=headers, params=params)

    ret_res = make_response(
        jsonify(response.json()["audio_features"] if response.status_code == 200 else []),
        response.status_code
    )
    ret_res.headers["Content-Type"] = "application/json"
    return ret_res
