# Our Tech Stack
[Data - Spotify Podcast Dataset](#data)<br>
[Database - SQLite](#database)<br>
[Backend - Python](#backend)<br>
[Frontend - Python with Flask](#frontend)<br>
[Container - Docker](#container)
## Data
We decided to use the [Spotify Podcast Dataset](https://podcastsdataset.byspotify.com/)<br>
<br>
Pros
- Lots of data and the data is very detailed. Allows us to answer interesting questions.
- Simple to download and set up. Just download a bunch of files.

Cons
- Might be too much data. We'll likely need to cut off some data.
- We need to request access from Spotify. Depending on how long they take to respond, we might be delayed from making progress on the database.

We considered these other options:<br>
<br>
Various music datasets on [Kaggle](https://www.kaggle.com/search?q=music)
- Rejected because data can be submitted by anyone on the internet. That means data on Kaggle is likely outdated and/or contains errors.

[Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- Rejected because of rate limits and limited public domain data. We're only allowed a certain amount of requests every 30 seconds, making real-time large data
computation impossible. The only public domain data available to us is metadata on songs, artists, and playlists.

[Spotify Million Playlist Dataset](https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge)
- Rejected because like the Spotify API, it only contains metadata about playlists. We won't be able to answer any meaningful questions with this dataset.

## Database
We decided to use [SQLite](https://www.sqlite.org/index.html).<br>
<br>
Pros
- It's server-less. Saves us money since we don't need to set up a server.
- It has native integration with Python. Saves us development time.

Cons
- SQLite's concurrency issues will cause problems if we decide to host our app on a server. If we ever want to expand to a client-server app, we'll need to switch
to a different database.

We also considered [MySQL](https://www.mysql.com/) but rejected it because it requires us to host it on a server. Our app will be locally run, so having our
database on a server will make development and performance worse with no benefit over a server-less database like SQLite.

## Backend
We decided to use [Python](https://www.python.org/).<br>
Pros
- Fast at crunching numbers. Our app will be doing lots of that.
- Has built-in support for machine learning which our app will use.

Cons
- Dynamic typing will make complex code structures hard to manage. We'll need to emphasize code simplicity over design.

We also considered [Node JS](https://nodejs.org/en/) with [Typescript](https://www.typescriptlang.org/) but rejected it because it has less support for machine
learning which will complicate our code. Another downside is that our backend team (Roger and Burt) in charge of handling the machine learning code is unfamiliar
with Node JS and Typescript.

## Frontend
We decided to use Python with [Flask](https://flask.palletsprojects.com/en/2.2.x/).<br>
<br>
Pros
- Same language as our backend. Makes connecting to our backend easy, saves development time, and keeps our build chain simple.
- Flask's UI library is minimal. It's easy to use but hard to make complicated UI. Our app's main focus is not on UI, so this tradeoff is perfect for us.

Cons
- Most of our team is new to Flask, so we'll need to spend extra time learning it.

We also considered [React JS](https://reactjs.org/) but rejected it because the added complexity of having a different language for our frontend was too much
to justify using React. Our app's focus is not on the UI, so we can't justify adding so much complexity just to make our UI look a bit better. We originally decided on React and created a [branch](https://github.com/KirillTregubov/csc302/tree/dev-js) to set it up. However, after pivoting our project to use ML on large data, we abandonded that branch and switched over to Flask.

## Container
We decided to use [Docker](https://www.docker.com/).<br>
<br>
Pros
- Separates frontend and backend environments.
- We can install dependencies and run all environments in 1 command.
- Allows us to package the final product as an image.

Cons
- Steep learning curve.
- Hard to make a script to install environments on any operating system. Which scripts to run for which operating systems needs to be implemented manually in an if-else chain, making it impossible to write scripts for more than a few operating systems (if you have an obscure OS, you probably can't set up our app).
- User needs to have Docker installed on their machine. Some other services are completed hosted online.

We also considered [AWS](https://aws.amazon.com/) but rejected it because of 2 reasons. First, the services are not free. Second, hosting multiple containers together is very complicated. We'd rather use Docker which has compose.
