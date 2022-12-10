import sqlite3
import logging
from flask import g

DATABASE = "database.db"


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        logging.info("Connected to database")
    return db


def close_db():
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
        logging.info("Closed database")
