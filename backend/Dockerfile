# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster

ARG workdir=

ENV FLASK_DEBUG=1
ENV FLASK_APP=src/main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5050

WORKDIR ${workdir}

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .${workdir}

CMD [ "python3", "-m" , "flask", "run" ]
