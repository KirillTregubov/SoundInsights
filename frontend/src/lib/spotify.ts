function api<T>(url: string, token: string): Promise<T> {
  return fetch(url, {
    method: 'GET',
    headers: { Authorization: token }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<T>
  })
}

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((_, item) => {
      const parts = item.split('=')
      // initial[parts[0]] = decodeURIComponent(parts[1])
      return decodeURIComponent(parts[1])
    }, {})
}

export const getPlaylists = async (spotify_token: string, user_id: string) => {
  const token = 'Bearer ' + spotify_token
  const playlists_url =
    'https://api.spotify.com/v1/users/' + user_id + '/playlists'
  const res = await api(playlists_url, token)
  console.log(res)
  if (res) {
    // code on how to get track info
    // request({url:playlists_url, headers:{"Authorization":token}}, function(err, res){
    //     if (res){
    //     var playlists=JSON.parse(res.body);
    //     var playlist_url = playlists.items[0].href;
    //     request({url:playlist_url, headers:{"Authorization":token}}, function(err, res){
    //         if (res){
    //         var playlist = JSON.parse(res.body);
    //         console.log("playlist: " + playlist.name);
    //         playlist.tracks.items.forEach(function(track){
    //             console.log(track.track.name);
    //         });
    //         }
    //     })
    //     }
    // })
  }
}
