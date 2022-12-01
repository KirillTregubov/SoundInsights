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
import os


from src.spotify_helper import get_access_token, get_client_credentials

# abspath = os.path.abspath(__file__)
# dname = os.path.dirname(abspath)
# os.chdir(dname)


def continue_playlist(my_uris):
    
    if len(my_uris) == 0:
        raise ValueError("At least 1 track_uri must be provided")
    
    # define global variables
    SIZE = 500  # this defines how many playlists we want
    
    # for Spotify API
    cid, secret = get_client_credentials()
    client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    
    def unpack(json_name):
        '''
        unpack a json playlist file to obtain a playlist
        input: a file name
        return: SIZE list of playlists
        '''
        # Opening JSON file
        f = open(json_name)
        
        # returns JSON object as
        # a dictionary
        data = json.load(f)
        f.close()
        playlists = data['playlists']
        return playlists
    
    playlists = unpack(json_name='src/model/data/playlists.json')
    
    # print(playlists[0]["tracks"][0])
    
    def find_uris(playlists, start=0, SIZE=SIZE):
        '''
        ouput the uri list for a given playlist
        input: a playlist
        return: a list of all track uris, and the playlist uri
        '''
        track_uris = [[i['track_uri'] for i in playlists[j]['tracks']] for j in range(start, SIZE)]
        pids = [playlists[i]['pid'] for i in range(start, SIZE)]
        return track_uris, pids
    
    # check track_uris for first playlist in dataset
    start = 0
    uri_list, pids = find_uris(playlists, start, SIZE)
    
    # print(len(uri_list[0]))
    # print(pids[0])
    
    def playlist_summarise(playlist_uri):
        '''
        where we query playlist uris with spotify API
        input: list of uris for a given playlist
        return: the mean features of the given playlist
        '''
        all_key = np.zeros(len(playlist_uri))
        all_acousticness = np.zeros(len(playlist_uri))
        all_danceability = np.zeros(len(playlist_uri))
        all_energy = np.zeros(len(playlist_uri))
        all_instrumentalness = np.zeros(len(playlist_uri))
        all_loudness = np.zeros(len(playlist_uri))
        all_speechiness = np.zeros(len(playlist_uri))
        all_valence = np.zeros(len(playlist_uri))
        all_tempo = np.zeros(len(playlist_uri))
        
        # unpack each uri
        for i in tqdm(range(len(playlist_uri))):
            # query spotify api
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
        
        # calculate means
        key = np.mean(all_key)
        acousticness = np.mean(all_acousticness)
        danceability = np.mean(all_danceability)
        energy = np.mean(all_energy)
        instrumentalness = np.mean(all_instrumentalness)
        loudness = np.mean(all_loudness)
        speechiness = np.mean(all_speechiness)
        valence = np.mean(all_valence)
        tempo = np.mean(all_tempo)
        
        # return all means
        return [key, acousticness, danceability, energy,
                instrumentalness, loudness, speechiness,
                valence, tempo]
    
    def normalize_df(df, col_names):
        x = df.values  # returns a numpy array
        min_max_scaler = MinMaxScaler()
        x_scaled = min_max_scaler.fit_transform(x)
        df = pd.DataFrame(x_scaled, columns=col_names)
        return df
    
    def create_playlist_dataframe(playlists):
        '''
        summary function to allow ease of playlist transformation into a df
        input: SIZE list of playlists
        output: dataframe with all mean playlist features
        '''
        # find uris and playlist ids
        uri_list, pids = (playlists, start, SIZE)
        
        # set up dataframe
        col_names = ['pid', 'key', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'loudness', 'speechiness', 'valence', 'tempo']
        df = pd.DataFrame(columns=col_names)  # generate empty df
        
        # iterate through and get features for each playlist
        for i in range(SIZE):
            features = playlist_summarise(uri_list[i])
            features.insert(0, 0)
            df.loc[i] = features
        
        df = normalize_df(df, col_names)
        # insert ids
        df['pid'] = pids
        return df
    
    # playlist_df = create_playlist_dataframe(playlists)
    playlist_df = pd.read_csv('src/model/cache/playlist_df.csv', index_col=0)
    playlist_df
    
    # convert genre to label encoded
    genres = ['pop', 'hip-hop', 'edm', 'latin', 'rock',
              'r-n-b', 'country', 'jazz', 'classical',
              'alternative']
    
    # number of songs to query per genre
    song_num = 100
    n_requests = 20
    
    # we generate using genre seeds
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
        
        # query spotify api for each genre n_requests time
        # this method bypasses the 100 limit on song queries
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
        
        # turn into sets to remove duplicates
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
            print('Done writing list into a binary file')
    
    # compile uris
    song_uris = (pop_uris + hip_hop_uris + edm_uris + latin_uris + rock_uris + randb_uris +
                 country_uris + jazz_uris + classical_uris + alternative_uris)
    
    # create a list for labels
    genre_list = ((['pop'] * len(pop_uris)) + (['hip-hop'] * len(hip_hop_uris)) +
                  (['edm'] * len(edm_uris)) + (['latin'] * len(latin_uris)) +
                  (['rock'] * len(rock_uris)) + (['r-n-b'] * len(randb_uris)) +
                  (['country'] * len(country_uris)) + (['jazz'] * len(jazz_uris)) +
                  (['classical'] * len(classical_uris)) + (['alternative'] * len(alternative_uris)))
    
    def create_song_dataframe(song_uris):
        '''
        combine all song URIS into a df
        input: song uris
        output: dataframe with all song features
        '''
        
        # set up dataframe
        col_names = ['uri', 'genre', 'key', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'loudness', 'speechiness', 'valence', 'tempo']
        df = pd.DataFrame(columns=col_names)  # generate empty df
        
        # iterate through and get features for each playlist
        for i in tqdm(range(len(song_uris))):
            # get song features
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
        # insert uris and genres
        df['uri'] = song_uris
        df['genre'] = genre_list
        return df
    
    # song_df = pd.read_csv('song_df.csv', index_col=0)
    
    try:
        with open('src/model/cache/dataframe', 'rb') as fp:
            song_df = pickle.load(fp)
    except FileNotFoundError:
        song_df = create_song_dataframe(song_uris)
        with open('src/model/cache/dataframe', 'wb') as fp:
            pickle.dump(song_df, fp)
            print('Done writing list into a binary file')
    
    song_df
    
    # label encode
    for i in range(len(genres)):
        song_df['genre'] = np.where(song_df['genre'] == genres[i], i, song_df['genre'])
    
    # set up unlabelled dfs
    playlist_df_ul = playlist_df.drop(columns=['pid'])
    song_df_ul = song_df.drop(columns=['uri', 'genre'])
    
    # set up unlabelled song_df (but with index for reference)
    X = song_df.drop(columns=['uri', 'genre']).values
    y = song_df[['genre']].values.ravel()
    
    # train test split for model testing
    X_train, X_test, y_train, y_test = train_test_split(X, list(y), test_size=0.05, random_state=2)
    
    # increment k from 1 to 50 and save the testing accuracy to find best k
    k_range = range(1, 50)
    scores_list = []
    
    # k somewhere near 40 is best
    knn = KNeighborsClassifier(n_neighbors=40)
    knn.fit(X_train, y_train)
    y_pred = knn.predict(X_test)
    
    # custom shit
    my_knn = KNeighborsClassifier(n_neighbors=40)
    my_knn.fit(X_train, y_train)
    X_challenge = X[:20, :]
    y_challenge = y[:20]
    y_challenge_pred = my_knn.predict(X_challenge)
    
    def classify_playlist(playlist, KNN=True):
        '''
        chooses which classifier to use (knn or nn)
        '''
        
        playlist_prediction = knn.predict(playlist.reshape(1, -1))
        
        return playlist_prediction
    
    def predict_song(my_uris):
        
        # print(f"Name of playlist: {playlists[playlist_index]['name']}")
        # features = playlist_df_ul.values[playlist_index]
        features = np.array(playlist_summarise(my_uris))
        # print(f"Features: {features}")
        playlist_prediction = classify_playlist(features, True)
        print(f'The playlist is genre: {genres[playlist_prediction[0]]}')
        
        # generate songs of specific genre
        genre_songs = song_df.loc[song_df['genre'] == playlist_prediction[0]]
        genre_songs = genre_songs.drop(columns=['genre']).reset_index(drop=True)
        
        # so we take all genre songs we have and gaussian process
        # fit a Gaussian Mixture Model
        clf = mixture.GaussianMixture(n_components=(len(genre_songs)) // n_requests, covariance_type='full', random_state=0)
        clf.fit(genre_songs.drop(columns=['uri']).values)
        
        # predict classes using GMM
        classes = clf.predict(genre_songs.drop(columns=['uri']).values)
        
        # recommend top x songs
        most_recommended_songs = clf.predict_proba(features.reshape(1, -1))[0]
        # print(most_recommended_songs)
        max_index, max_value = max(enumerate(most_recommended_songs), key=operator.itemgetter(1))
        
        # take the songs
        songs_index = np.where(classes == max_index)
        selected_songs = genre_songs.loc[songs_index]
        selected_songs_uris = selected_songs['uri'].values
        
        # remove overlapping songs
        for element in my_uris:
            if element in selected_songs_uris:
                selected_songs_uris.remove(element)
        
        # print('\n')
        # print('The recommended songs, in no particular order, are:')
        counter = 0
        
        ret = []
        
        for i in random.sample(sorted(selected_songs_uris), 10):
            counter += 1
            entry = f"[{sp.track(i)['uri']}]: {sp.track(i)['name']}, by {sp.track(i)['artists'][0]['name']}"
            # print(entry)
            ret.append(sp.track(i)["uri"])
            if counter == 10:
                break
        
        # print(ret)
        return ret
    
    return predict_song(my_uris)


if __name__ == "__main__":
    
    # using KNN
    my_uris = ["spotify:track:6B8hg3hfAk3zI1YLD78Va8",
               "spotify:track:6dFcL5hsy8dy0RCFx7f5FD",
               "spotify:track:2CEgGE6aESpnmtfiZwYlbV",
               "spotify:track:4BFMQ15vXr626UOoZL8bUI",
               "spotify:track:08kCck8nAJJEmxg0gXaJot"]
    
    ret = continue_playlist(my_uris)
    print(ret)