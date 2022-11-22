
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = 'http://localhost:5000/callback'
    const clientId = 'f07ef9ab78224bd6b90ffeedcc2d014c';
    // const clientSecret = '2d51bbcad9f24856aafd1777716eb250'; 
    const scopes = [
        // "user-read-private",
        // "user-read-email",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
        "user-modify-playback-state",
    ]

export const login_url = `${authEndpoint}?
client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`

const UserLogin: React.FC = () => {
  return (
      <div>
        <button onClick={event =>  window.location.href=login_url} >Sign in with spotify</button>
      </div>
    
  )
}

export default UserLogin