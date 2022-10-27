import json
import os
from typing import List
from ..src.main import create_app
import pytest


@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


def test_query_db(client):
    response = client.get("/db-demo")
    keys = response.json.keys()
    assert "query" in keys
    assert "result" in keys


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
    if os.environ.get("USING_DOCKER").lower() == 'true':
        assert response.status_code == 200
        assert len(response.json) == 2
        # TODO: Fix API key
        assert isinstance(response.json, List)
        for track in response.json:
            keys = track.keys()
            assert "name" in keys
            assert "artists" in keys
            assert isinstance(track["artists"], List)
            assert "image_url" in keys
    else:
        assert response.status_code == 401
