const clientID = '';
const clientSecret = '';

let accessToken = '';
let userID = '';

const urlHasToken = function(url) {
  return url.match(/access_token=([^&]*)/);
}

const getToken = function(url) {
  return url.match(/access_token=([^&]*)/)[1];
}

const urlHasExpireTime = function(url) {
  return url.match(/expires_in=([^&]*)/);
}

const getExpireTime = function(url) {
  return url.match(/expires_in=([^&]*)/)[1];
}

export const Spotify = {
  getAccessToken: function (keyword) {
    if (accessToken == '') {
      const currHref = window.location.href;
      if (urlHasToken(currHref) && urlHasExpireTime(currHref)) {
        accessToken = getToken(currHref);
        let expiresIn = getExpireTime(currHref);
        console.log(`Get Token: ${accessToken}`);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('A ccess Token', null, '/');
      }
      else {
        const aurhorizeEndPoint = "https://accounts.spotify.com/authorize?"
        const id = "client_id=" + clientID;
        const redirctURL = `&redirect_uri=${window.location.href}`;
        const scope = '&scope=playlist-modify-public';
        const token = '&response_type=token';
        const state = '&state=123';

        const url = aurhorizeEndPoint + id + redirctURL + scope + token + state;
        console.log("Authorize URL: " + url);
        window.location = url;
      }
    }

    if (keyword != '') {
      keyword = keyword.replace(' ', '+');
    }

    console.log(`Has Token: ${accessToken}`);
    const searchEndPoint = "https://api.spotify.com/v1/search?";
    const query = "q=" + keyword;
    const type = "&type=track";

    const url = searchEndPoint + query + type;
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    const myInit = {
      headers: myHeaders
    }
    console.log("Serch Track URL: " + url);

    return fetch(url, myInit)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("Request Searching Tracks Failed!");
    }, networkError => {
      console.log(networkError.message);
    })
    .then(jsonResponse => {
      return jsonResponse;
    })
    .then(jsonObject => {
      // console.log('searchResult: ' + jsonObject);
      if (jsonObject == undefined) {
        return [];
      }
      const tracks = jsonObject.tracks.items;
      if (tracks.length != 0) {
        return tracks.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      } else {
        return [];
      }
    });
  },

  savePlaylist: function(playlistName, playListTracks) {
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    const myInit = {
      headers: myHeaders
    }

    return fetch("https://api.spotify.com/v1/me", myInit)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("Request User id failed");
    }, networkError => {
      console.log(networkError.message);
    })
    .then(jsonResponse => {
      return jsonResponse.id;
    })
    .then(id => {
      userID = id;
      const playlistEndpoint = "https://api.spotify.com/v1/users/" + id + "/playlists";

      let myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + accessToken);
      myHeaders.append('Content-type', 'application/json');
      const myInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({name: playlistName})
      }
      console.log("playlistEndpoint: " + playlistEndpoint);

      return fetch(playlistEndpoint, myInit)
      .then(response => {
        if (response.ok) {
          console.log("Successfully create playlist!");
          return response.json();
        }
        console.log("Fail to create playlist");
      }, networkError => console.log(networkError.message))
      .then(jsonResponse => {
        console.log("New Track's ID: " + jsonResponse.id);
        return jsonResponse.id;
      })
      .then(playlistID => {
        const addTrackEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' +accessToken);
        myHeaders.append('Content-type', 'application/json');
        const myInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({uris: playListTracks.map(track => track.uri)})
        }

        return fetch(addTrackEndpoint, myInit)
        .then(response => {
          if (response.ok) {
            console.log("Successfully add tracks!");
            return response.ok;
          }
          console.log("Fail to add track");
          return response.ok
        })
      })
    })
  }
}
