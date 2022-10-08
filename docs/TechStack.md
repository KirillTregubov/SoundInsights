# Our Tech Stack
[Data - Spotify Million Playlist Dataset](#data)<br>
[Database - SQLite](#database)<br>
[Backend - Python + Flask](#backend)<br>
[Frontend - TypeScript + React](#frontend)<br>
[Container - Docker](#container)
## Data
We decided to use the [Spotify Million Playlist Dataset](https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge).

### Pros
- Comes directly from Spotify, so it's accurate and up-to-date.
- There's lots of data (1 million playlists!).
- Simple to download and set up. Just download a bunch of files.

### Cons
- Most of the data is metadata, which limits the interesting questions we can ask about the data.

### Alternatives
We considered the following options:

1. Various music datasets on [Kaggle](https://www.kaggle.com/search?q=music)
    - Rejected because data can be submitted by anyone on the internet. That means data on Kaggle is likely outdated and/or contains errors.

1. [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
    - Rejected because of rate limits and limited public domain data. We're only allowed a certain amount of requests every 30 seconds, making real-time large data computation impossible. The only public domain data available to us is metadata on songs, artists, and playlists.

1. [Spotify Podcast Dataset](https://podcastsdataset.byspotify.com/)
    - Rejected because it's taking too long for Spotify to approve our request to use their dataset. We'd rather just use a different viable dataset than delay the project by several weeks just to wait for Spotify to approve our request.

## Database
We decided to use [SQLite](https://www.sqlite.org/index.html).

### Pros
- It's server-less. Saves us money since we don't need to set up a server.
- It has native integration with Python. Saves us development time.

### Cons
- SQLite's concurrency issues will cause problems if we decide to host our app on a server. If we ever want to expand to a client-server app, we'll need to switch to a different database.

### Alternatives
We considered [MySQL](https://www.mysql.com/) but rejected it because it requires us to host it on a server. Our app will be locally run, so having our database on a server will make development and performance worse with no benefit over a server-less database like SQLite.

## Backend
We decided to use [Flask](https://flask.palletsprojects.com/en/2.2.x/).<br>
Pros
- Python is fast at crunching numbers. Our app will be doing lots of that.
- Python has built-in support for machine learning which our app will use.

Cons
- Dynamic typing will make complex code structures hard to manage. We'll need to emphasize code simplicity over design.

We also considered [Node.js](https://nodejs.org/en/) with [TypeScript](https://www.typescriptlang.org/) but rejected it because it has less support for machine learning which will complicate our code and is less performant. Another downside is that our backend team (Roger and Burt) in charge of handling the machine learning code is unfamiliar with both Node.js and TypeScript.

## Frontend
We decided to use [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/).<br>

### Pros
- Our environment controls the entire runtime from page load onwards. This allows us to build dynamic UI components easier and better handle user input.
- More mature than other JS frameworks. This will save us development time, provide solutions to common problems and give us access to a vast library and component ecosystem.
- Our connection between frontend and backend is through HTTP requests, so the language has very little effect on middleware and communication complexity.
- TypeScript allows for better runtime predictability of code, static type safety, and improved DX with autocompletion and maintainability

### Cons
- Development is more complicated now that we have 2 separate languages and environments in our project.
- TypeScript will have a learning curve for team members who have not used it before

### Alternatives
We also considered [Flask](https://flask.palletsprojects.com/en/2.2.x/) but rejected it because the only way we can build UI is by sending static HTML responses and bundle JS files to handle user interaction. We plan to have a few dynamic UI components in our app, so having control of the entire UI lifecycle on the client is important to us. Although it was enticing to have the same language for both our frontend and backend codebases, the limitations of Flask as a frontend library and our prediction that we would not be able to share significant amounts of code was too much to justify using it over React with TypeScript.

## Container
We decided to use [Docker](https://www.docker.com/).

### Pros
- Separates frontend and backend environments from themselves and from the machine environment they are running on.
- We can install the required dependencies and run all environments in one command.
- Docker Compose can connect frontend and backend environments easily through a network, independent of the languages the environments use.
- Allows us to package the final product as an image.

### Cons
- Steep learning curve and none of us had previous experience with it.
- Hard to make a script to install the required environment for Docker on any operating system. Each operating system has a unique set of steps that need to be completed, which requires an if-else chain to correctly identify and configure each one. This limits our ability to support operating systems outside of the most popular ones (if you have an obscure OS, you probably can't set up our app).
- User needs to have Docker installed on their machine to run our application. Some other solutions can generate executables or are hosted.

### Alternatives
We considered [AWS](https://aws.amazon.com/), specifically [AWS Lambda](https://aws.amazon.com/lambda/), but rejected it because of 2 reasons. First, the services are not free. Second, hosting multiple environments can scale in complexity quickly. We'd rather use Docker which has compose.
