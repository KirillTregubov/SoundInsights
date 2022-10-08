# Team Ez2Type

[Meeting Notes](https://github.com/KirillTregubov/csc302/tree/main/docs)<br>
[Roadmap](https://github.com/KirillTregubov/csc302/blob/main/docs/Roadmap.md)<br>
[Tech Stack](https://github.com/KirillTregubov/csc302/blob/main/docs/TechStack.md)<br>

## Usage

Install Docker using:
```sh
bash install-docker.sh
```
and verify it's installed using:
```sh
docker info
```
<br>

Run the Docker containers using:

```sh
docker compose up --build
```
<br>

Test our project using:
```sh
TODO: add test script here
```

## A Small Example
Inside the "src" directory you will find a toy example of how to use a small slice of our dataset. The main code is in "main.py" and the dataset is called "dataset_small.json". When the code runs, it will generate a database file called "database.db".

The full dataset is from the "Spotify Million Playlist Dataset Challenge" and can be downloaded from https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge/dataset_files.
