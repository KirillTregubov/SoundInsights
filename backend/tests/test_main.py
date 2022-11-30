import json
import os
from typing import List
from flask import Response


def test_query_db(client):
    response = client.get("/db-demo")
    keys = response.json.keys()
    assert "query" in keys
    assert "result" in keys


# Recommend tracks
def test_recommend_tracks_endpoint_bad_request(client):
    response = client.post("/recommend-tracks")
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_recommend_tracks_endpoint_bad_request_2(client):
    response = client.post("/recommend-tracks", data=json.dumps({}))
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_recommend_tracks_endpoint_bad_request_3(client):
    response = client.post(
        "/recommend-tracks", data=json.dumps({}), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "request body must contain a data field"


def test_recommend_tracks_endpoint_bad_request_4(client):
    response = client.post("/recommend-tracks", data=json.dumps({
        "data": [
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H",
            "1lzr43nnXAijIGYnCT8M8H"
        ]
    }), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "data must be a list of 1-5 track_uris"


def test_recommend_tracks_endpoint(client):
    response = client.post("/recommend-tracks", data=json.dumps({
        "data": [
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H"
        ]
    }), content_type='application/json')
    # TODO: Fix API key
    docker = os.environ.get("USING_DOCKER")
    if type(docker) == str and docker.lower() == 'true':
        assert response.status_code == 200
        assert isinstance(response.json, List)
        for track in response.json:
            keys = track.keys()
            assert "name" in keys
            assert "artists" in keys
            assert isinstance(track["artists"], List)
            assert "images" in keys
    else:
        assert response.status_code == 401


# General info
def test_get_general_info_endpoint_bad_request_1(client):
    response = client.get("/general-info")
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_get_general_info_endpoint_bad_request_2(client):
    response = client.get("/general-info", data=json.dumps({}))
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_get_general_info_endpoint_bad_request_3(client):
    response = client.get(
        "/general-info", data=json.dumps({}), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "request body must contain a data field"


def test_get_general_info_endpoint_bad_request_4(client):
    response = client.get("/general-info", data=json.dumps({
        "data": []
    }), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "data must be a list of 1-50 track_uris"


def test_get_general_info_endpoint_bad_request_5(client):
    data = []
    for i in range(55):
        data.append(f"track_uri_{i}")

    response = client.get("/general-info", data=json.dumps({
        "data": data
    }), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "data must be a list of 1-50 track_uris"


def test_get_general_info_endpoint(client):
    response: Response = client.get("/general-info", data=json.dumps({
        "data": [
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H"
        ]
    }), content_type='application/json')

    docker = os.environ.get("USING_DOCKER")
    if type(docker) == str and docker.lower() == 'true':
        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 5
    else:
        assert response.status_code == 401


# Audio features
def test_get_audio_features_endpoint_bad_request_1(client):
    response = client.get("/audio-features")
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_get_audio_features_endpoint_bad_request_2(client):
    response = client.get("/audio-features", data=json.dumps({}))
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_get_audio_features_endpoint_bad_request_3(client):
    response = client.get(
        "/audio-features", data=json.dumps({}), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "request body must contain a data field"


def test_get_audio_features_endpoint_bad_request_4(client):
    response = client.get("/audio-features", data=json.dumps({
        "data": []
    }), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "data must be a list of 1-100 track_uris"


def test_get_audio_features_endpoint_bad_request_5(client):
    data = []
    for i in range(104):
        data.append(f"track_uri_{i}")

    response = client.get("/audio-features", data=json.dumps({
        "data": data
    }), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "data must be a list of 1-100 track_uris"


def test_get_audio_features_endpoint(client):
    response: Response = client.get("/audio-features", data=json.dumps({
        "data": [
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H"
        ]
    }), content_type='application/json')

    docker = os.environ.get("USING_DOCKER")
    if type(docker) == str and docker.lower() == 'true':
        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 5
    else:
        assert response.status_code == 401


# Recommend many tracks
def test_recommend_many_tracks_endpoint_no_input(client):
    response = client.post("/recommend-many-tracks")
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_recommend_many_tracks_endpoint_no_content_type(client):
    response = client.post("/recommend-many-tracks", data=json.dumps({}))
    assert response.status_code == 400
    assert response.json["error"] == "content_type must be application/json"


def test_recommend_many_tracks_endpoint_no_data_field(client):
    response = client.post(
        "/recommend-many-tracks", data=json.dumps({}), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "request body must contain a data field"


def test_recommend_many_tracks_endpoint_empty_input(client):
    response = client.post("/recommend-many-tracks", data=json.dumps({
        "data": []
    }), content_type='application/json')
    assert response.status_code == 400
    assert response.json["error"] == "data must be a list of 1-N/A track_uris"


def test_recommend_many_tracks_endpoint(client):
    response = client.post("/recommend-many-tracks", data=json.dumps({
        "data": [
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H",
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H"
        ]
    }), content_type='application/json')
    # TODO: Fix API key
    docker = os.environ.get("USING_DOCKER")
    if type(docker) == str and docker.lower() == 'true':
        assert response.status_code == 200
        assert isinstance(response.json, List)
        for track in response.json:
            keys = track.keys()
            assert "name" in keys
            assert "artists" in keys
            assert isinstance(track["artists"], List)
            assert "images" in keys
    else:
        assert response.status_code == 401


# test get top playlists
def test_get_top_playlists_endpoint_success(client):
    response = client.get("/get-top-playlists")
    # TODO: Fix API key
    docker = os.environ.get("USING_DOCKER")
    if type(docker) == str and docker.lower() == 'true':
        assert response.status_code == 200
        assert isinstance(response.json, List)
        for playlist in response.json:
            keys = playlist.keys()
            assert "name" in keys
            assert "image" in keys
            assert "uri" in keys
            assert "owner" in keys
            assert "color" in keys
    else:
        assert response.status_code == 401
