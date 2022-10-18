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
