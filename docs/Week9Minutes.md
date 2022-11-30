# Week 9 Minutes
November 16, 2022

### Recap
- Eddie and Burt finished their tasks.
- Roger is still working on his task.

### We then covered the A3 outline.
- Add these to the readme
  - expand our project description at the top of the page
  - move features section to the top of the page
  - outline exactly what they can use our app for
  - Explain what our dataset is in more detail.
  - Add a "goals" section containing:
    - (1) Why we have decided to present our data in the way that we have and (2) why it matters.
    - Explain our goal of visualizing our data and how a user can reproduce it.
  - Write down a list of features we want to have and retroactively mark them as unfinished if we can't finish them in time.
- Integration tests
  - Encode all 4 milestones and all major feature flows (user stories) we will outline in the readme.
- Establish production environment
  - Create separate script that runs frontend and backend in production mode.
  - Create image/executable for final build.
- We should revisit our testing strategy and think about how to "draw a straight line from your documentation of the validation criteria to the code executing the tests".
  - This should include adding a section about this to the readme.
- Do a blameless retro. on A2 next meeting.
- Create a 10 minute presentation -- for later on.

### Features we want to implement
- Login with Spotify, choose playlist(s) you like, then generate similar songs based on those playlist(s).
- Visualize data
  - General user data
  - General track info
    - breakdown of artists, genre, popularity, duration, albums, release date, etc.
    - Inspired by Spotify Wrapped.
  - input: top 50+ tracks or user playlists
  - [get audio features](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features) (or audio analysis if we get to it) of the input
  - output: render visualizations of audio features
    - Use `tempo` to determine slow and fast songs.
    - Use `instrumentalness` and `speechiness` to determine lyric/instrument heavy songs.
    - Use `energy` to measure intensity and activity of songs (energetic, somber, chill, etc.).
    - Use `liveness` to determine "live" tracks (songs recorded live).
    - Use `key` with `modality` to determine "mood" of songs.
  - For non-Spotify subscribers, we will do the same analysis on predetermined playlists (ex. get most popular playlists [here](https://www.chosic.com/best-spotify-playlists/)).

### Tasks for next week
Burt
- Finish code to get user playists.
- Once endpoints are implemented, experiment with resulting data.

Eddie
- Create endpoints to get audio data
  - frontend passes in array of 50 track ID's which we'll pass to Spotify API to query general track info. [Reference](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-tracks).
  - frontend passes in array of 100 track ID's which we'll pass to Spotify API to query audio features. [Reference](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features).

Kirill
- Configure libraries for frontend visualization.
- Implement multi-page layout.

Roger
- Continue working on integrating ML model.
