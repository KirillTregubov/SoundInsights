from typing import Optional
import requests
import os
from dotenv import load_dotenv


# Make sure you have a .env file with the correct CLIENT_ID and CLIENT_SECRET to use the Spotify API.
# If you don't have the correct .env, you get it from our project Discord chat's pinned messages.
load_dotenv()

def get_access_token() -> Optional[str]:
    response = requests.post("https://accounts.spotify.com/api/token", {
        "grant_type": "client_credentials",
        "client_id": os.environ.get("CLIENT_ID"),
        "client_secret": os.environ.get("CLIENT_SECRET"),
    })
    
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        return None
