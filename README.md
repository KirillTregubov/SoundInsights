<div id="readme-top"></div>

<div align="center">
  <a href="https://github.com/KirillTregubov/csc302">
    <img width="200px" height="200px" src="https://raw.githubusercontent.com/KirillTregubov/csc302/a7c5f08e80f02bbeac78c2ce48d5e84fa04b4a7a/frontend/assets/icon.svg">
  </a>
  <div align="center">
    <a href="docs/IconCopyright.md">Icon Copyright</a>
  </div>
  <h2 align="center">Team Ez2Type</h2>
  <p align="center">
    A University of Toronto group project for CSC302 that generates recommendations based on Spotify tracks and playlists and has a playlist analyzer that displays interesting visualizations.
    <div>
      <a href="https://github.com/KirillTregubov/csc302/tree/main/docs">Meeting Notes</a>
      ·
      <a href="#top">Documentation</a>
      ·
      <a href="https://github.com/users/KirillTregubov/projects/1">Roadmap</a>
    </div>
  </p>
</div>
<br />

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [A3 Deliverable](#a3-deliverable)
- [Guide](#guide)
- [Features](#features)
- [Our Dataset](#our-dataset)
- [Roadmap](#roadmap)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Linux](#linux)
  - [macOS](#macos)
  - [Windows](#windows)
  - [Troubleshooting](#troubleshooting)
- [Usage (build & test)](#usage)
  - [Linux](#linux-1)
  - [macOS and Windows](#macos--windows-wsl)
  - [Troubleshooting](#troubleshooting-1)
  - [Other Scripts](#other-scripts)
- [Features we Missed](#features-we-missed)
- [Legacy Documents](#legacy-documents)
- [License](#license)
- [Maintainers](#maintainers)

<div id="top"></div>

## Screenshots
<details><summary>Desktop Screenshots</summary>
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/KirillTregubov/csc302/blob/main/assets/recommendation-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/KirillTregubov/csc302/blob/main/assets/recommendation.png">
      <img alt="Screenshot of the Track Recommendations" src="https://github.com/KirillTregubov/csc302/blob/main/assets/recommendation-dark.png">
    </picture>
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/KirillTregubov/csc302/blob/main/assets/analysis-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/KirillTregubov/csc302/blob/main/assets/analysis.png">
      <img alt="Screenshot of the Playlist Analysis Report" src="https://github.com/KirillTregubov/csc302/blob/main/assets/analysis-dark.png">
    </picture>
</details>

## A3 Deliverable
This section contains some stuff regarding A3 for your convenience.
- [Our project's goals + a guide on how to use our web app](#guide).
- [Elaboration of our dataset](#our-dataset).
- [Features that weren't delivered](#features-we-missed).
- [Meeting Notes](https://github.com/KirillTregubov/csc302/tree/main/docs) from weeks 9 to 11 are for A3.
- [A2 blameless postmortem](docs/A2Postmortem.md).

## Guide
Our goal with visualization is to open people's eyes to why they listen to the music they listen to; to satiate their curiosity of their own listening trends. Ever wondered why you're putting that one artist's tracks on repeat 24/7? Plug their songs into our visual analysis systems and get some insight into what audio percs you're so enamored with. You might even find some new songs to get addicted to in the process!

To properly run our app, you'll need to have the correct secret values on your machine. We decided the easiest way to safely pass you these secret values is to upload them via the A3 quercus submission. **Please check Eddie Shao's A3 quercus submission to get these secret values as well as the instructions on how to use them in our project.**

Once you have the secrets set up, go through the [Installation](#installation) and [Usage (build)](#usage) instructions. The "Get Song Recommendations" and "Get Playlist Recommendations" features will recommend songs to you and the "Analysis of Top Playlists" feature will show some visual analysis about Spotify's top playlists. More information about these in the [features](#features) section.

Visualization in our app is done in 2 different ways: song recommendations and data analysis using [Recharts](https://recharts.org/en-US/).

## Features

### Song Recommendations
Ask our app to recommend you some new songs based on what you give it. There are 2 ways to ask for song recommendations:
- Search up individual Spotify tracks you enjoy and get our app to recommend you new songs similar to what you've chosen.
- Choose a Spotify playlist from a predetermined list or search one and have our app recommend you new songs similar to those on the selected playlist.

### Analyze Spotify's Top Playlists
Get a visual analysis of various information for the songs in Spotify's top playlists. Some things you can visualize include patterns in mood, genre, tempo, and more.

## Our Dataset
The dataset we used is Spotify. More specifically, we used both the [Spotify Million Playlist](https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge) dataset and [Spotify API](https://developer.spotify.com/documentation/web-api/) in tandem.
- The Spotify Million Playlist dataset is used to train our machine learning model. This model is what powers our song recommendation system.
- The Spotify API is our data source for songs and playlists that we run visual analyses on. Through the Spotify API, we have access to audio and meta information which we use to display trends and patterns.

## Roadmap

Our [Roadmap](https://github.com/users/KirillTregubov/projects/1/) shows all our tasks labelled by status (complete, in progress, not started), assignee, and milestone.

## Tech Stack

Here is an overview of our tech stack. Detailed information (pros, cons, alternatives, etc.) can be found in [this document](docs/TechStack.md).

### Frontend

[![TypeScript](https://img.shields.io/badge/TypeScript-FaF9F8?logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

### Backend

[![Python](https://img.shields.io/badge/Python-3670A0?logo=python&logoColor=ffdd54)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-%23000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

### Container

[![Docker](https://img.shields.io/badge/Docker-%230db7ed?logo=docker&logoColor=white)](https://www.docker.com/)

### CI

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-%232671E5?logo=github-actions&logoColor=white)]()

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

To verify that the script worked, try to open `Docker Desktop` using your Operating System's search features. If it is missing or doesn't open and succesfully start the Docker engine, or if the install script fails, please [install Docker Desktop](https://docs.docker.com/desktop/) yourself.

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

### Other Scripts

To add a package to the backend, execute the following helper script:

```sh
bash ./backend/install-pkg.sh
```

To run linting for both the frontend and backend, execute:

```sh
bash ./run-lint.sh
```

## Features we Missed

### Analyze Your Spotify Account
Originally, we planned to also visualize data about a user's Spotify account (listening habits, song patterns, etc.). However, due to problems with time and Spotify authorization, we couldn't implement this.

User data visualization was the last item on our todo list, so we held off on researching it until later on. Unfortunately, we found out too late that the Spotify authorization we adopted in our project didn't allow us to do general user authentication. We didn't have time to re-implement the authorization flow again, so we decided to scrap that idea and analyze public data instead.

## Legacy Documents

- [A2 Deliverable](https://github.com/KirillTregubov/csc302/blob/main/docs/A2Deliverable.md)
- [A1 Postmortem](docs/A1Postmortem.md)

## License

All code in this repository is distributed under the GNU GPLv3 license. See [`LICENSE.txt`](LICENSE) for more information.

## Maintainers

- [Kirill Tregubov](https://github.com/KirillTregubov)
- [Eddie Shao](https://github.com/EddieShao)
- [Burt Lau](https://github.com/burtlau)
- [Roger Liu](https://github.com/pvtstaticvoid)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
