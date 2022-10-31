<div id="readme-top"></div>

<div align="center">
  <a href="https://github.com/KirillTregubov/csc302">
    <svg width="500" height="500" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 250C0 112.142 112.155 0 250.007 0 387.855 0 500 112.147 500 250c0 31.127-5.717 60.943-16.157 88.454-.529 1.393-2.347 1.719-3.373.639a100.003 100.003 0 0 0-143.181-1.804 100.003 100.003 0 0 0 1.805 143.182c1.08 1.026.754 2.844-.639 3.373C310.946 494.283 281.132 500 250.007 500 112.145 500 0 387.848 0 250Zm233.083-99.817L198.177 34.157c-10.069 1.757-14.436 2.826-24.195 7.508l49.281 109.959c2.692-.595 3.681-.865 4.688-1.029 1.046-.17 2.112-.225 5.132-.412Zm-93.673-93.59c-24.982 13.521-47.37 32.213-65.452 55.681l94.191 75.91c9.404-13.093 21.6-23.134 35.449-29.645L139.41 56.594Zm30.858 193.397c0 43.971 35.771 79.741 79.743 79.741 43.973 0 79.744-35.77 79.744-79.741s-35.771-79.741-79.744-79.741c-43.972 0-79.743 35.77-79.743 79.741Z" fill="currentColor"/><path d="M250 213.913c19.296 0 36.087 16.79 36.087 36.087 0 19.297-16.79 36.087-36.087 36.087-19.297 0-36.087-16.79-36.087-36.087 0-19.297 16.79-36.087 36.087-36.087ZM250 190c-33.135 0-60 26.861-60 60 0 33.135 26.861 60 60 60 33.135 0 60-26.861 60-60 0-33.135-26.865-60-60-60Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M347.396 347.396a85 85 0 1 1 120.208 120.207 85 85 0 0 1-120.208-120.207Zm65.043 23.396a7.69 7.69 0 0 1 2.253 5.439v23.077h23.077a7.693 7.693 0 1 1 0 15.384h-23.077v23.077a7.693 7.693 0 1 1-15.384 0v-23.077h-23.077a7.69 7.69 0 1 1 0-15.384h23.077v-23.077a7.69 7.69 0 0 1 13.131-5.439Z" fill="currentColor"/></svg>
    <a href="https://github.com/KirillTregubov/csc302/blob/main/docs/IconCopyright.md">Icon Copyright</a>
  </a>
  <h2 align="center">Team Ez2Type</h2>
  <p align="center">
    A group project for UofT course CSC302 that uses the Spotify Million Playlist Dataset to display interesting and meaningful results.
    <!-- <br />
    <a href="https://github.com/KirillTregubov/csc302"><strong>Explore the docs »</strong></a> -->
    <div>
      <a href="https://github.com/KirillTregubov/csc302/tree/main/docs">Meeting Notes</a>
      ·
      <a href="#top">Documentation</a>
      ·
      <a href="https://github.com/users/KirillTregubov/projects/1">Roadmap</a>
    </div>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
### Table of Contents
- [Assignment 2](#assignment-2)
- [Features](#features)
- [Planned Features](#planned-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Linux](#linux)
  - [macOS](#macos)
  - [Windows](#windows)
  - [Troubleshooting](#troubleshooting)
- [Usage](#usage) (build & test)
  - [Linux](#linux-1)
  - [macOS and Windows](#macos--windows-wsl)
  - [Troubleshooting](#troubleshooting-1)
  - [Other Scripts](#other-scripts)
- [License](#license)
- [Maintainers](#maintainers)


<div id="top"></div>

## Assignment 2

All detailed information related to Assignment 2 not covered on this page can be found in [this document](https://github.com/KirillTregubov/csc302/blob/main/docs/A2Deliverable.md), including a description of what we planned to implement in A2 as well as a progress report on our milestones.

Meeting notes for A2 are weeks 5-8. Roadmap and tech stack are the same as from A1.

## Features

- **Get recommended tracks**: Provide up to 5 Spotify tracks and get recommended tracks based on an ML model.

## Planned Features

Our [Roadmap](https://github.com/users/KirillTregubov/projects/1/) shows all our tasks labelled by status (complete, in progress, not started), assignee, and milestone.

## Tech Stack

[Tech Stack](https://github.com/KirillTregubov/csc302/blob/main/docs/TechStack.md) contains detailed information about the technologies we are using including Pros, Cons and Alternatives.

### Dataset

The [Spotify Million Playlist Dataset](https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge) and the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

### Database

[![SQLITE](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/index.html)

### Frontend

[![TypeScript](https://img.shields.io/badge/TypeScript-FaF9F8?logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

### Backend

[![Python](https://img.shields.io/badge/python-3670A0?logo=python&logoColor=ffdd54)](https://www.python.org/)
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

## License

All code in this repository is distributed under the GNU GPLv3 license. See [`LICENSE.txt`](https://github.com/KirillTregubov/csc302/blob/main/LICENSE) for more information.

## Maintainers

- [Kirill Tregubov](https://github.com/KirillTregubov)
- [Eddie Shao](https://github.com/EddieShao)
- [Burt Lau](https://github.com/burtlau)
- [Roger Liu](https://github.com/pvtstaticvoid)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
