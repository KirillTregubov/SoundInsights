# Team Ez2Type

[Meeting Notes](https://github.com/KirillTregubov/csc302/tree/main/docs)<br>
[Roadmap](https://github.com/KirillTregubov/csc302/blob/main/docs/Roadmap.md)<br>
[Tech Stack](https://github.com/KirillTregubov/csc302/blob/main/docs/TechStack.md)<br>

## Installation

> Windows requires [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) to be installed to use Docker.

Install the development environment by executing the following command in a shell:

```sh
bash run-install.sh
```

Once the script finishes running, open Docker Desktop and complete setup. Once it shows `Engine running`, you can verify it works by executing:

```sh
docker info
```

If the script fails to run on your machine, please [install Docker Desktop](https://docs.docker.com/desktop/) yourself.

## Usage

### Linux and macOS

To build our application and run it in development mode, execute the following command:

```sh
bash run-build.sh
```

To run tests for the application, execute:

```sh
bash run-tests.sh
```

If you run into issues related to permissions for running the scripts, execute:

```sh
sudo chmod 755 ./<script>.sh
```

Replacing `<script>` with the script name.

## A Small Example

Inside the "src" directory you will find a toy example of how to use a small slice of our dataset. The main code is in "main.py" and the dataset is called "dataset_small.json". When the code runs, it will generate a database file called "database.db".

The full dataset is from the "Spotify Million Playlist Dataset Challenge" and can be downloaded from https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge/dataset_files.
