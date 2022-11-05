import json
from typing import Optional, List
import requests
import os


def get_access_token() -> Optional[str]:
    client_id = os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("CLIENT_SECRET")

    # If secrets are not configured in the environment, try using the secrets file.
    if client_id is None or client_secret is None:
        try:
            secrets = open("secrets.txt", "r").read().split(",")
            client_id = secrets[0]
            client_secret = secrets[1]
        except (OSError, IndexError):
            return None

    response = requests.post("https://accounts.spotify.com/api/token", {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
    })

    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        return None


def get_tracks(tracks) -> List[str]:
    result = []
    for track in tracks:
        all_images = track["album"]["images"]
        # last image is the largest one
        images = None if len(all_images) == 0 else {
            "large": all_images[0]["url"], "small": all_images[-1]["url"]}
        result.append({
            "name": track["name"],
            "artists": list(map(lambda artist: artist["name"], track["artists"])),
            "images": images,
            "uri": track["uri"],
            "explicit": track["explicit"]
        })
    return result
