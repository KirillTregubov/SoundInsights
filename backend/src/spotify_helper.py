from typing import Optional, List, Dict, Any
from src.response_handler import log_error_res
from typing import Optional, List, Tuple
import requests
import os
import logging


def get_access_token() -> Optional[str]:
    logging.info("get_access_token()")
    credentials = get_client_credentials()
    if credentials is None:
        return None
    
    response = requests.post("https://accounts.spotify.com/api/token", {
        "grant_type": "client_credentials",
        "client_id": credentials[0],
        "client_secret": credentials[1],
    })
    
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        log_error_res(response, "POST")
        return None


def get_client_credentials() -> Optional[Tuple[str, str]]:
    logging.info("get_client_credentials()")
    client_id = os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("CLIENT_SECRET")
    
    # If secrets are not configured in the environment, try using the secrets file.
    if client_id is None or client_secret is None:
        try:
            secrets = open("secrets.txt", "r").read().split(",")
            client_id = secrets[0]
            client_secret = secrets[1]
        except (OSError, IndexError):
            logging.error("secrets.txt is either missing or in the wrong format.")
            return None
    
    return client_id, client_secret


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


def get_playlist(playlist) -> Dict[Any, dict]:
    all_images = playlist["images"]
    tracks = []
    for track in playlist["tracks"]["items"]:
        tracks.append(track["track"]["id"])
    return {
        "name": playlist["name"],
        "image": None if len(all_images) == 0 else all_images[0]["url"],
        "uri": playlist["uri"],
        "owner": playlist["owner"]["display_name"],
        "color": playlist["primary_color"],
        "tracks": tracks
    }


if __name__ == "__main__":
    cid, secret = get_client_credentials()
    print(cid)
