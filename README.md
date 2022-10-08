# CSC302

Inside the "src" directory you will find a toy example of how to use a small slice of our dataset. The main code is in "main.py" and the dataset is called "dataset_small.json". When the code runs, it will generate a database file called "database.db".

The full dataset is from the "Spotify Million Playlist Dataset Challenge" and can be downloaded from https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge/dataset_files.

## Usage

To run the application, run the following command:

```sh
docker compose up --build
```

To run tests for the application, run:

```sh
docker compose --file docker-compose-test.yml up --build
```
