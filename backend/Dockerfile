# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster

ARG workdir=

# WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

WORKDIR ${workdir}

CMD [ "python3", "main.py"]
