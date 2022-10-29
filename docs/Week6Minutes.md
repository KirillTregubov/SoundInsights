## Week 6 Meeting Minutes
Last week tasks follow up
- Eddie
  - Specify how to interface with the Python script (i.e. what am I sending the Python script and what do I want back from the Python script).
  - Implement endpoint that handles GET requests and responds with data. (Done)

- Kirill
  - Configure Docker network and integrate backend and frontend comms.(Done)
  - Decide on the website layout (pages, etc.).
  - Add tailwind and create mockup. (Done)

- Burt
  - Check to make sure all code is tested on Tuesday. (Done)
  - Implement components that take in the user query. (Done)

- Roger
  - Think up of a class of suitable questions to ask about the dataset. One using ML and one using basic DB stuff. (Done)
  - Research models to actually compute this stuff. (Done)

Ideas:
  - Roger found a ML model, given a playlist of song spotify id(track id), it can recommands one or more songs you might like.
  - User gives the song names (frontend), and backend maps the song names to their ids, these ids are passed to ML script, the 
  script then recommands a new song id, then we pass the result back to the frontend.
  

For next week: 
- Eddie
  - Write a flask end point that implement the idea above.
  - If the frontend asks what is the percentage of the playlist with the rock or pop genre, Eddie can take these values and parse to the python script.

- Kirill
  - Decide on the website layout (pages, etc.).
  - Implement Continuous Integration
  
- Roger
  - The answers will be given back to backend with types and values.
  - Input and output all go through one function in python in json format for Eddie(backend).
  - Get a toy example for ML code to work.

- Burt
  - Implement the idea above. Asks user to input the song names, and work with Eddie to pass these song names to the backend.
  - Check to make sure all code is tested.

### Milestone progress report:
what we finished:
- Milestone2
  - "Weekly check-in to make sure every component/function has an accompanying task." <br>
  Evey components/functions we wrote has a accompanying task on github issues. 
- Milestone3
  - "We plan on communicating between Python and Flask using Json". <br>
  Complete the set up and will continue in next week.
- Milestone4
  - "Implement the component that takes in user inputs". <br>
  Complete an example, will implement in next week.

### For next week
Kirill suggested:
- We let users login and choose playlist(s) to generate similar songs to selected playlists.
- Another feature: user types in some text to pass as playlist name and generate tracks that way.
- Implement some visualization for data we get back from the ML model (ex. bar graph showing distribution of genres returned, etc.).
