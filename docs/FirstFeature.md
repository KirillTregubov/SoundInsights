# Specifications for Implementing First Feature
### October 21, 2022

ML Model
- Create a wrapper with a function (that Eddie will use) to pass in list of 5 `track_uri`s.
- Do ML magic and then return the 500 `track_uri`s recommended by the ML model.

Backend Endpoint
- Create a POST endpoint that takes in a JSON (format: `{ "data" : ["", ""] /* list of track_uri */ }`) for frontend to hit.
- Send ML model a python list of 5 `track_uri`s (strings).
- Once ML returns recommended tracks, loop through `track_uri`s and query track name, artist, etc. Use [this](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track) for reference.
- `jsonify` the queried track data and pass it back to the frontend using the response.

Frontend Component
- Input box and search button.
- Input box needs to query the Spotify API for song suggestions. Use [this](https://developer.spotify.com/documentation/web-api/reference/#/operations/search) for reference.
- Search button calls the backend endpoint, passing in JSON with song suggestions from the input box.
- Await and (conditionally) display JSON received from backend response.

# Note for next week
Kirill suggested...
- We let users login and choose playlist(s) to generate similar songs to selected playlists.
- Another feature: user types in some text to pass as playlist name and generate tracks that way.
- Implement some visualization for data we get back from the ML model (ex. bar graph showing distribution of genres returned, etc.).
