import pytest
from ..src.main import create_app


@pytest.fixture(scope='session', autouse=True)
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    yield app


@pytest.fixture(scope='session', autouse=True)
def client(app):
    return app.test_client()
