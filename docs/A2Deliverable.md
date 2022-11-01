# A2 Deliverable
### October 21, 2022

This document contains all the core expectations for assignment 2.

## Description of the features your project intends to implement
CI
- We prioritized this because "everything that can be automated at this point must be".
- Deliverables:
  - Create Github action(s) to automatically run our testing suite on commit to any branch.
    - Assigned to Kirill.
    - Due on November 9, 2022.
    - Acceptance criteria:
      - Commiting to a branch runs the testing suite.
  - Create a Github action to delete feature branches after they've been merged to dev.
    - Assigned to Kirill.
    - Due on November 9, 2022.
    - Acceptance criteria:
      - After merging a branch to dev, that branch must no longer exist.

We will also be implementing our first feature: a song recommendation engine.<br>
*As a user, I want to select a list of songs I like and have new songs recommended to me.*

ML Model
- We prioritized this because it is the backbone of our recommendation feature. Without the ML model, we can't generate recommendations.
- Deliverables:
  - Set up the ML model and get it running properly.
    - Assigned to Roger.
    - Due on October 26, 2022.
    - Acceptance criteria:
      - Given a list of input `track_uri`s, running the ML model generates a CSV of recommended `track_uri`s that make sense (based on sanity check).
      - Code for the ML model must be commited to the repo without errors.
  - Create a black-box public function (interface) that takes in a list of 1-5 `track_uri`s and returns a list of 100 recommended `track_uri`s.
    - Assigned to Roger.
    - Due on November 2, 2022.
    - Acceptance criteria:
      - Given a list of input `track_uri`s, the black-box function successfully uses the ML model to generate a new list of recommended songs.
      - The function is able to be called by the backend endpoint.

Backend Endpoint
- We prioritized this because the backend needs to turn the ML model's recommended `track_uri`s into a readable format. If the frontend just received a list of random characters (aka `track_uri`s), it wouldn't be very useful to the user.
- Deliverables:
  - Create a POST endpoint that takes a request with a list of input `track_uri`s and returns a response with a list of track data. The request input will be a JSON of `{ "data": list<string> }` and the response will be a JSON of `list<{ "name": string, "artists": list<string>, "image_url": string }>`.
    - Assigned to Eddie.
    - Due on October 26, 2022.
    - Acceptance criteria:
      - Endpoint returns a response of the correct format.
      - Endpoint calls the ML model black-box interface function to get a list of recommended `track_uri`s.
      - Endpoint uses the [Spotify track API](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track) to query name, artists, and cover image of these recommended `track_uri`s to send to the frontend.

Frontend Component
- We prioritized this because we need a way to present our recommendations to the user in a recognizable way. As mentioned before, handing the users a list of random characters (aka. `track_uri`s) would not be very useful to them.
- Deliverables:
  - An input box (for the user to type song names) and a search button (to generate recommended songs).
    - Assigned to Burt and Kirill.
    - Due on October 26, 2022.
    - Acceptance criteria:
      - Input box and search button need to be usable by the user.
      - Input box needs to recommend autofill options for song names using [Spotify searching API](https://developer.spotify.com/documentation/web-api/reference/#/operations/search).
      - Search button needs to call the corresponding backend endpoint and pass it the list of songs from the input box.
  - Display recommended songs for the user.
    - Assigned to Kirill.
    - Due on October 26, 2022.
    - Acceptance criteria:
      - Need to write UI components to conditionally render responses from the recommendation backend endpoint.
      - These UI components need to be somewhat readably by the user.\

## Progress of our Milestones
Milestone 2: Enforce automation and testing.
- Ensure our code is linted, styled, and sufficiently tested. **IN PROGRESS**
- Set up automatic testing, building, integration and deployment pipelines. **DONE**

Milestone 3: Create a backend that runs machine learning on our data to answer interesting, complex questions.
- Set up ML models that work on our data. **DONE**
- Code logic to process the info our ML models output and communicate it to the frontend. **IN PROGRESS (first feature done)**

Milestone 4: Create a client that allows users to input queries they have related to our data and display meaningful conclusions and visualizations about it.
- Design the user interface, with a focus on exposing all features, handling query input, and displaying data in appropriate formats. **DONE**
- Implement UI components. **IN PROGRESS (first feature done)**
- Implement communication with backend. **IN PROGRESS (first feature done)**
