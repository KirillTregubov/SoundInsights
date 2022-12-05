from src.response_handler import log_error_res
from typing import Any, Dict, Optional, List, Tuple
import requests
import os
import logging
import datetime as dt


token_cache: Dict[str, Any] = {
    "token": "",
    "expires_in": 0,
    "access_time": dt.datetime.today()
}


credentials_cache: Dict[str, str] = {
    "client_id": "",
    "client_secret": ""
}


def get_access_token() -> Optional[str]:
    logging.info("get_access_token()")
    if (dt.datetime.today() - token_cache["access_time"]).total_seconds() < token_cache["expires_in"] - 10:
        # token hasn't expired yet (10 second buffer)
        logging.debug("get access token from CACHE")

        return token_cache["token"]
    else:
        # token has expired; get a new one
        logging.debug("get access token from REQUEST")

        credentials = get_client_credentials()
        if credentials is None:
            return None

        response = requests.post("https://accounts.spotify.com/api/token", {
            "grant_type": "client_credentials",
            "client_id": credentials[0],
            "client_secret": credentials[1],
        })

        if response.status_code == 200:
            data = response.json()
            token_cache["token"] = data["access_token"]
            token_cache["expires_in"] = data["expires_in"]
            token_cache["access_time"] = dt.datetime.today() # getting new time again bc request takes time
            return data["access_token"]
        else:
            log_error_res(response, "POST")
            return None


def get_client_credentials() -> Optional[Tuple[str, str]]:
    logging.info("get_client_credentials()")
    cached_client_id = credentials_cache["client_id"]
    cached_client_secret = credentials_cache["client_secret"]

    if cached_client_id and cached_client_secret:
        logging.debug("get client creds from CACHE")
        return cached_client_id, cached_client_secret

    logging.debug("get client creds from ENV or FILE")
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

    credentials_cache["client_id"] = client_id
    credentials_cache["client_secret"] = client_secret
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

if __name__ == "__main__":
    cid, secret = get_client_credentials()
    print(cid)