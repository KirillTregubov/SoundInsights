# Team Ez2Type

[Meeting Notes](https://github.com/KirillTregubov/csc302/tree/main/docs)<br>
[Roadmap](https://github.com/KirillTregubov/csc302/blob/main/docs/Roadmap.md)<br>
[Tech Stack](https://github.com/KirillTregubov/csc302/blob/main/docs/TechStack.md)<br>

## A2 Deliverable

Here is the [document](https://github.com/KirillTregubov/csc302/blob/main/docs/A2Deliverable.md) containing a description of what we planned to implement in A2 as well as the progress report on our milestones.

Please consult the links above for our meeting notes, tech stack, and roadmap. Meeting notes for A2 are weeks 5-8. Roadmap and tech stack are the same as from A1.

## Installation

### Linux

Install the development environment by executing the following command in a shell:

```sh
sudo bash run-install.sh
```

### macOS

Install the development environment by executing the following command in a shell:

```sh
bash run-install.sh
```

> Once the script finishes running, open Docker Desktop and complete setup.

If the script fails to run on your machine, please [install Docker Desktop](https://docs.docker.com/desktop/) yourself.

### Windows

On Windows, install the development environment by executing:

```sh
run-install.bat
```

> Once the script finishes running, open Docker Desktop and complete setup.

## Usage

### Linux

To build our application and run it in development mode, execute the following command:

```sh
sudo bash run-build.sh
```

To run tests for the application, execute:

```sh
sudo bash run-tests.sh
```

If you run into issues related to permissions for running the scripts, execute:

```sh
sudo chmod 755 ./<script>.sh
```

Replacing `<script>` with the script name.

### macOS

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
