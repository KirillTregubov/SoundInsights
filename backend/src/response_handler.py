from requests import Response
import logging


def log_error_res(response: Response, request_type: str):
    if response.status_code == 200:
        pass
    elif response.status_code < 400:
        logging.warning(f"Unexpected response from {request_type} {response.url}: {response.status_code} - {response.reason}")
    else:
        logging.error(f"Bad response from {request_type} {response.url}: {response.status_code} - {response.reason}")
