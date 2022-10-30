# Team Ez2Type

<div align="center">
  <!-- <a href="https://github.com/KirillTregubov/csc302">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h2 align="center">CSC302</h2>
  <p align="center">
    A group project that uses the Spotify Million Playlist Dataset to display interesting and meaningful results.
    <!-- <br />
    <a href="https://github.com/KirillTregubov/csc302"><strong>Explore the docs »</strong></a> -->
    <div>
      <a href="https://github.com/KirillTregubov/csc302/tree/main/docs">Meeting Notes</a>
      ·
      <a href="https://github.com/KirillTregubov/csc302/blob/main/docs/Documentation.md">Documentation</a>
      ·
      <a href="https://github.com/users/KirillTregubov/projects/1">Roadmap</a>
    </div>
  </p>
</div>

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

### Windows

On Windows, install the development environment by executing:

```sh
run-install.bat
```

### Troubleshooting

If the script fails to run on your machine, please [install Docker Desktop](https://docs.docker.com/desktop/) yourself.

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

### macOS & Windows (WSL)

To build our application and run it in development mode, execute the following command:

```sh
bash run-build.sh
```

To run tests for the application, execute:

```sh
bash run-tests.sh
```

### Troubleshooting

If you run into issues related to permissions for running the scripts, execute the following command replacing `<script>` with the script name:

```sh
sudo chmod 755 ./<script>.sh
```

## Development

To add a package to the backend, execute the following helper script:

```sh
bash ./backend/install-pkg.sh
```

## A Small Example

Inside the "src" directory you will find a toy example of how to use a small slice of our dataset. The main code is in "main.py" and the dataset is called "dataset_small.json". When the code runs, it will generate a database file called "database.db".

The full dataset is from the "Spotify Million Playlist Dataset Challenge" and can be downloaded from https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge/dataset_files.
