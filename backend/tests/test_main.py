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


def test_recommend_tracks_endpoint(client):
    response = client.post("/recommend-tracks", data={
        "data": [
            "0UaMYEvWZi0ZqiDOoHU3YI",
            "6I9VzXrHxO9rA9A5euc8Ak",
            "0WqIKmW4BTrj3eJFmnCKMv",
            "1AWQoqb9bSvzTjaLralEkT",
            "1lzr43nnXAijIGYnCT8M8H"
	    ]
    })
    assert response.status_code == 200
    assert isinstance(response.json, List)
    for track in response.json:
        keys = track.keys()
        assert "name" in keys
        assert "artists" in keys
        assert isinstance(track["artists"], List)
        assert "image_url" in keys
