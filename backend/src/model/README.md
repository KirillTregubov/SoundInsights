# Playlist Continuation Toy Example

This toy example fits a KNN model on a small slice of our dataset (found in data/playlists.json). The main code is in "model.py", and importing it will give you access to a wrapper function "continue_playlist" which takes as input an array of track_uris and outputs an array of 10 track_uris.

For performance reasons (~1s runtime), keep the input at around 5 track_uris. The model comes with precomputed values for several portions of the code. Deleting the cache (found in the cache directory) will result in a total runtime on the order of minutes.

The full model can be found at https://github.com/Briiick/spotify-recommendation.