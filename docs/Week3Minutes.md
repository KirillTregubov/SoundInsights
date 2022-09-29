## Week 3 Meeting Minutes

Follow-up on last week's assigned tasks
Kirill
- JS frontend is set up.
- Vite and linter is set up.
Eddie
- MySQL db on AWS (free for 12 months) is set up.
- Created a demo app to show how to connect to it (using Node).
Burt
- Brainstormed a bunch of ideas for what kind of data we can get from Spotify.

After much consideration, we decided to pivot from working with personal user data to “big” data datasets instead. Therefore, we ditched the idea of using the
Spotify api because it doesn't offer much "big" data endpoints. Instead, we looked at using one of [these](https://research.atspotify.com/datasets/) datasets.
The Spotify podcasts database is our first choice, but we’ll use whichever ones we have access to by the time A2 starts (we've requested access to them).

After that, we discussed what new technologies we’ll want to use since we pivoted to using “big” data instead.
- SQLite for the db since it's a static local app now.
- Python for the backend logic (Roger will be in charge of using ML to get some interesting conclusions from our data).
- Python Flask instead of React JS for serving frontend. We can’t justify using an entire new language + framework just to write nicer frontend code.
The point of our project is now to handle data and do cool stuff about it, not designing the best website UI.

We might chop off parts of the database if it’s too big for us.

We decided to keep the project architecture the same (as if we’re hosting servers) but we’ll do everything on localhost to save money because our options for
running servers is expensive. However, we’ll design it in a way where we can simply change some parameters to spin it up on a remote server instead.

We decided the repository will be public. We don't have any rejections to making our work publicly available and all of us are in favor of having work to add
to our portfolio.

### We've needed to make some changes to the milestones after pivoting our project.

Milestone 1: A potential user should be able to use the service that shows data and trends relevant to a query regarding podcasts.
- Determine how we will display the data. **Kirill**
- Write components for displaying the analyses. **Burt**
- Write logic to interface with our python backend and Spotify API. **Kirill**

Milestone 2: A potential user should be able to interact with a python “server” that runs models on our dataset.
- Implement the models. **Roger, Burt**
- Write logic to interface with the data and process it. **TBD**
- Figure out how we want to analyze the data (ex. what models to use). **Roger**

Milestone 3: The database.
- Wait for responses on dataset applications and consider alternatives.
- Download the dataset, make it interfaceable with Python, and sanitize if needed.

Milestone 4: The testing suite.
- Ensure all code is linted, styled, and substantially tested for relevant use cases.

### Tasks for next week

Eddie
- Start Readme file.
- Formalize our roadmap and make it look nice.
- Set up python testing suite.

Kirill
- Set up Docker.

Burt
- Set up python Flask environment and document it.

Roger
- Set up python backend environment and document it.
