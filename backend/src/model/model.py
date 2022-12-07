import json
import operator
import random
import numpy as np
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from tqdm import tqdm
from sklearn.preprocessing import MinMaxScaler
from sklearn import mixture
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import pickle
from src.spotify_helper import get_access_token, get_client_credentials


def continue_playlist(my_uris, debug=False):
    
    if len(my_uris) == 0:
        raise ValueError("At least 1 track_uri must be provided!")

    credentials = get_client_credentials()
    if credentials is None:
        raise RuntimeError("Unable to get Spotify client credentials!")
    
    client_credentials_manager = SpotifyClientCredentials(client_id=credentials[0], client_secret=credentials[1])
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    def playlist_summarise(playlist_uri):
        
        all_key = np.zeros(len(playlist_uri))
        all_acousticness = np.zeros(len(playlist_uri))
        all_danceability = np.zeros(len(playlist_uri))
        all_energy = np.zeros(len(playlist_uri))
        all_instrumentalness = np.zeros(len(playlist_uri))
        all_loudness = np.zeros(len(playlist_uri))
        all_speechiness = np.zeros(len(playlist_uri))
        all_valence = np.zeros(len(playlist_uri))
        all_tempo = np.zeros(len(playlist_uri))
        
        enumerable = tqdm(range(len(playlist_uri))) if debug else range(len(playlist_uri))
        for i in enumerable:
            audio_features = sp.audio_features(playlist_uri[i])
            all_key[i] = audio_features[0]['key']
            all_acousticness[i] = audio_features[0]['acousticness']
            all_danceability[i] = audio_features[0]['danceability']
            all_energy[i] = audio_features[0]['energy']
            all_instrumentalness[i] = audio_features[0]['instrumentalness']
            all_loudness[i] = audio_features[0]['loudness']
            all_speechiness[i] = audio_features[0]['speechiness']
            all_valence[i] = audio_features[0]['valence']
            all_tempo[i] = audio_features[0]['tempo']
        
        key = np.mean(all_key)
        acousticness = np.mean(all_acousticness)
        danceability = np.mean(all_danceability)
        energy = np.mean(all_energy)
        instrumentalness = np.mean(all_instrumentalness)
        loudness = np.mean(all_loudness)
        speechiness = np.mean(all_speechiness)
        valence = np.mean(all_valence)
        tempo = np.mean(all_tempo)
        
        return [key, acousticness, danceability, energy, instrumentalness, loudness, speechiness, valence, tempo]
    
    def normalize_df(df, col_names):
        x = df.values
        min_max_scaler = MinMaxScaler()
        x_scaled = min_max_scaler.fit_transform(x)
        df = pd.DataFrame(x_scaled, columns=col_names)
        return df

    genres = ['pop', 'hip-hop', 'edm', 'latin', 'rock', 'r-n-b', 'country', 'jazz', 'classical', 'alternative']
    
    song_num = 100
    n_requests = 20
    
    pop_uris = []
    hip_hop_uris = []
    edm_uris = []
    latin_uris = []
    rock_uris = []
    randb_uris = []
    country_uris = []
    jazz_uris = []
    classical_uris = []
    alternative_uris = []
    
    try:
        with open('src/model/cache/combined', 'rb') as fp:
            combined = pickle.load(fp)
            pop_uris, hip_hop_uris, edm_uris, latin_uris, rock_uris, randb_uris, country_uris, jazz_uris, classical_uris, alternative_uris = combined
    
    except FileNotFoundError:
        for i in range(n_requests):
            pop_recs = sp.recommendations(seed_genres=['pop'], limit=song_num)
            pop_uris += [i['uri'] for i in pop_recs['tracks']]
            hip_hop_recs = sp.recommendations(seed_genres=['hip-hop'], limit=song_num)
            hip_hop_uris += [i['uri'] for i in hip_hop_recs['tracks']]
            edm_recs = sp.recommendations(seed_genres=['edm'], limit=song_num)
            edm_uris += [i['uri'] for i in edm_recs['tracks']]
            latin_recs = sp.recommendations(seed_genres=['latin'], limit=song_num)
            latin_uris += [i['uri'] for i in latin_recs['tracks']]
            rock_recs = sp.recommendations(seed_genres=['rock'], limit=song_num)
            rock_uris += [i['uri'] for i in rock_recs['tracks']]
            randb_recs = sp.recommendations(seed_genres=['r-n-b'], limit=song_num)
            randb_uris += [i['uri'] for i in randb_recs['tracks']]
            country_recs = sp.recommendations(seed_genres=['country'], limit=song_num)
            country_uris += [i['uri'] for i in country_recs['tracks']]
            jazz_recs = sp.recommendations(seed_genres=['jazz'], limit=song_num)
            jazz_uris += [i['uri'] for i in jazz_recs['tracks']]
            classical_recs = sp.recommendations(seed_genres=['classical'], limit=song_num)
            classical_uris += [i['uri'] for i in classical_recs['tracks']]
            alternative_recs = sp.recommendations(seed_genres=['alternative'], limit=song_num)
            alternative_uris += [i['uri'] for i in alternative_recs['tracks']]
        
        pop_uris = list(set(pop_uris))
        hip_hop_uris = list(set(hip_hop_uris))
        edm_uris = list(set(edm_uris))
        latin_uris = list(set(latin_uris))
        rock_uris = list(set(rock_uris))
        randb_uris = list(set(randb_uris))
        country_uris = list(set(country_uris))
        jazz_uris = list(set(jazz_uris))
        classical_uris = list(set(classical_uris))
        alternative_uris = list(set(alternative_uris))
        
        combined = [pop_uris, hip_hop_uris, edm_uris, latin_uris, rock_uris, randb_uris, country_uris, jazz_uris, classical_uris, alternative_uris]
        
        with open('src/model/cache/combined', 'wb') as fp:
            pickle.dump(combined, fp)
    
    song_uris = (pop_uris + hip_hop_uris + edm_uris + latin_uris + rock_uris + randb_uris +
                 country_uris + jazz_uris + classical_uris + alternative_uris)
    
    genre_list = ((['pop'] * len(pop_uris)) + (['hip-hop'] * len(hip_hop_uris)) +
                  (['edm'] * len(edm_uris)) + (['latin'] * len(latin_uris)) +
                  (['rock'] * len(rock_uris)) + (['r-n-b'] * len(randb_uris)) +
                  (['country'] * len(country_uris)) + (['jazz'] * len(jazz_uris)) +
                  (['classical'] * len(classical_uris)) + (['alternative'] * len(alternative_uris)))
    
    def create_song_dataframe(song_uris):
        col_names = ['uri', 'genre', 'key', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'loudness', 'speechiness', 'valence', 'tempo']
        df = pd.DataFrame(columns=col_names)
        
        enumerable = tqdm(range(len(song_uris))) if debug else range(len(song_uris))
        for i in enumerable:
            audio_features = sp.audio_features(song_uris[i])
            key = audio_features[0]['key']
            acousticness = audio_features[0]['acousticness']
            danceability = audio_features[0]['danceability']
            energy = audio_features[0]['energy']
            instrumentalness = audio_features[0]['instrumentalness']
            loudness = audio_features[0]['loudness']
            speechiness = audio_features[0]['speechiness']
            valence = audio_features[0]['valence']
            tempo = audio_features[0]['tempo']
            features = [key, acousticness, danceability, energy, instrumentalness, loudness, speechiness, valence, tempo]
            features.insert(0, 0)
            features.insert(0, 0)
            df.loc[i] = features
        
        df = normalize_df(df, col_names)
        df['uri'] = song_uris
        df['genre'] = genre_list
        
        return df
    
    try:
        with open('src/model/cache/dataframe', 'rb') as fp:
            song_df = pickle.load(fp)
    except FileNotFoundError:
        song_df = create_song_dataframe(song_uris)
        with open('src/model/cache/dataframe', 'wb') as fp:
            pickle.dump(song_df, fp)
            print('Done writing list into a binary file')
    
    for i in range(len(genres)):
        song_df['genre'] = np.where(song_df['genre'] == genres[i], i, song_df['genre'])
    
    X = song_df.drop(columns=['uri', 'genre']).values
    y = song_df[['genre']].values.ravel()
    X_train, X_test, y_train, y_test = train_test_split(X, list(y), test_size=0.05, random_state=2)
    knn = KNeighborsClassifier(n_neighbors=40)
    knn.fit(X_train, y_train)
    
    def classify_playlist(playlist):
        playlist_prediction = knn.predict(playlist.reshape(1, -1))
        return playlist_prediction
    
    def predict_song(my_uris):
        
        features = np.array(playlist_summarise(my_uris))
        playlist_prediction = classify_playlist(features)
        
        if debug:
            print(f'The playlist is genre: {genres[playlist_prediction[0]]}')
        
        genre_songs = song_df.loc[song_df['genre'] == playlist_prediction[0]]
        genre_songs = genre_songs.drop(columns=['genre']).reset_index(drop=True)
        
        clf = mixture.GaussianMixture(n_components=(len(genre_songs)) // n_requests, covariance_type='full', random_state=0)
        clf.fit(genre_songs.drop(columns=['uri']).values)
        
        classes = clf.predict(genre_songs.drop(columns=['uri']).values)
        most_recommended_songs = clf.predict_proba(features.reshape(1, -1))[0]
        max_index, max_value = max(enumerate(most_recommended_songs), key=operator.itemgetter(1))
        songs_index = np.where(classes == max_index)
        selected_songs = genre_songs.loc[songs_index]
        selected_songs_uris = selected_songs['uri'].values
        
        for element in my_uris:
            if element in selected_songs_uris:
                selected_songs_uris.remove(element)
        
        counter = 0
        ret = []
        for i in random.sample(sorted(selected_songs_uris), 10):
            counter += 1
            ret.append(sp.track(i)["uri"])
            if counter == 10:
                break
        
        return ret
    
    return predict_song(my_uris)


if __name__ == "__main__":
    my_uris = ["spotify:track:6B8hg3hfAk3zI1YLD78Va8",
               "spotify:track:6dFcL5hsy8dy0RCFx7f5FD",
               "spotify:track:2CEgGE6aESpnmtfiZwYlbV",
               "spotify:track:4BFMQ15vXr626UOoZL8bUI",
               "spotify:track:08kCck8nAJJEmxg0gXaJot"]
    ret = continue_playlist(my_uris, debug=True)
    print(ret)
