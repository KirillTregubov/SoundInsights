# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster

ARG workdir=

WORKDIR ${workdir}

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .${workdir}

CMD [ "python3", "main.py"]
