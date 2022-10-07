# Our Tech Stack
[Data - Spotify Podcast Dataset](#data)<br>
[Database - SQLite](#database)<br>
[Backend - Flask](#backend)<br>
[Frontend - React](#frontend)<br>
[Container - Docker](#container)
## Data
We decided to use the [Spotify Million Playlist Dataset](https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge)<br>
<br>
Pros
- Comes directly from Spotify, so it's accurate and up-to-date.
- There's lots of data (1 million playlists!).
- Simple to download and set up. Just download a bunch of files.

Cons
- Most of the data is metadata, which limits the interesting questions we can ask about the data.

We considered these other options:<br>
<br>
Various music datasets on [Kaggle](https://www.kaggle.com/search?q=music)
- Rejected because data can be submitted by anyone on the internet. That means data on Kaggle is likely outdated and/or contains errors.

[Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- Rejected because of rate limits and limited public domain data. We're only allowed a certain amount of requests every 30 seconds, making real-time large data computation impossible. The only public domain data available to us is metadata on songs, artists, and playlists.

[Spotify Podcast Dataset](https://podcastsdataset.byspotify.com/)
- Rejected because it's taking too long for Spotify to approve our request to use their dataset. We'd rather just use a different viable dataset than delay the project by several weeks just to wait for Spotify to approve our request.

## Database
We decided to use [SQLite](https://www.sqlite.org/index.html).<br>
<br>
Pros
- It's server-less. Saves us money since we don't need to set up a server.
- It has native integration with Python. Saves us development time.

Cons
- SQLite's concurrency issues will cause problems if we decide to host our app on a server. If we ever want to expand to a client-server app, we'll need to switch to a different database.

We also considered [MySQL](https://www.mysql.com/) but rejected it because it requires us to host it on a server. Our app will be locally run, so having our database on a server will make development and performance worse with no benefit over a server-less database like SQLite.

## Backend
We decided to use [Flask](https://flask.palletsprojects.com/en/2.2.x/).<br>
Pros
- Python is fast at crunching numbers. Our app will be doing lots of that.
- Python has built-in support for machine learning which our app will use.

Cons
- Dynamic typing will make complex code structures hard to manage. We'll need to emphasize code simplicity over design.

We also considered [Node JS](https://nodejs.org/en/) with [Typescript](https://www.typescriptlang.org/) but rejected it because it has less support for machine learning which will complicate our code. Another downside is that our backend team (Roger and Burt) in charge of handling the machine learning code is unfamiliar with Node JS and Typescript.

## Frontend
We decided to use [React](https://reactjs.org/).<br>
<br>
Pros
- Our code controls the entire frontend from page load onwards. Allows us to build dynamic UI components easier.
- Better tooling to make UI. Will save us development time.
- Our connection between frontend and backend is through REST API, so a separate language has very little drawback in middleware complexity.

Cons
- Development is more complicated now that we have 2 separate languages in our project.

We also considered [Flask](https://flask.palletsprojects.com/en/2.2.x/) but rejected it because the only way we can build UI is by sending static HTML responses. We plan to have a few dynamic UI components in our app, so having control of UI on the client side is important to us. Although it was tempting to have the same language for both our frontend and backend codebases, the limitations of Flask as a frontend library was too much to justify using it over React.

## Container
We decided to use [Docker](https://www.docker.com/).<br>
<br>
Pros
- Separates frontend and backend environments.
- We can install dependencies and run all environments in one command.
- Docker Compose can connect frontend and backend environments easily, even when they're 2 different languages.
- Allows us to package the final product as an image.

Cons
- Steep learning curve.
- Hard to make a script to install environments on any operating system. Which scripts to run for which operating systems needs to be implemented manually in an if-else chain, making it impossible to write scripts for more than a few operating systems (if you have an obscure OS, you probably can't set up our app).
- User needs to have Docker installed on their machine. Some other services are completed hosted online.

We also considered [AWS](https://aws.amazon.com/) but rejected it because of 2 reasons. First, the services are not free. Second, hosting multiple containers together is very complicated. We'd rather use Docker which has compose.
