from typing import Optional
import requests
import os


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
