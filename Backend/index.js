const express = require('express')
const app = express()
const port = 8888
const util = require('util')
const queryString = require("query-string");
const axios = require("axios");

const spotifyToken = {
  access_token: '',
  token_type: '',
  refresh_token: '',
  scope: ''
}
//list of spotifY ID's based on top artists used to generate recommended playlist
const playlist_factors = { seed1: "",
      seed2: "",
      seed3: "",
      seed4: "",
      seed5:""
}


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/getAccessToken", (req, res) => {
  //will get placed in the frontend
    res.send(
      "<a href='https://accounts.spotify.com/authorize?client_id=" +
        '13c6a1850e5d4dd2814971fbac941087' +
        "&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-top-read'>Sign in</a>"
    );
  });
app.get("/getTopTracks", async (req,res) => {
  const topTracks = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=5",
    {
      headers: {
        Authorization: "Bearer " + spotifyToken.access_token,
      },
    }
  );
  res.send(topTracks.data.items[0].id);
  console.log(topTracks.data.items[0].id);
  playlist_track.seed5 = topTracks.data.items[0].id;
})

app.get("/getTopArtists", async (req,res) => {
  const topArtists = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=5",
    {
      headers: {
        Authorization: "Bearer " + spotifyToken.access_token,
      },
    }
  );
  res.send(topArtists.data.items);
  console.log(topArtists.data.items[0].id);
  console.log(topArtists.data.items[1].id);
  console.log(topArtists.data.items[2].id);
  playlist_factors.seed1 = topArtists.data.items[0].id;
  playlist_factors.seed2 = topArtists.data.items[1].id;
  playlist_factors.seed3 = topArtists.data.items[2].id;
  playlist_factors.seed4 = topArtists.data.items[3].id;
  playlist_factors.seed5 = topArtists.data.items[4].id;
})
//recommends playlist based on top 5 artists, songs, and genres
app.get("/recommendedPlaylists", async (req,res) => {
  const playlists = await axios.get(
    `https://api.spotify.com/v1/recommendations/?seed_artists=${playlist_factors.seed1},${playlist_factors.seed2},${playlist_factors.seed3},${playlist_factors.seed4}`,
    {
      headers: {
        Authorization: "Bearer " + spotifyToken.access_token,
      },
    }
  );
    console.log(playlists.data);
    res.send(util.inspect(playlists.data))
}) 
 
app.get("/callback", async (req, res) => {
    const spotifyResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "authorization_code",
          code: req.query.code,
          redirect_uri: 'http://localhost:8888/callback',
        }),
        {
          headers: {
            Authorization: "Basic " + 'MTNjNmExODUwZTVkNGRkMjgxNDk3MWZiYWM5NDEwODc6OGE0ODdmMTk1YWMzNDViMGFmYjI4MWU4MzJkMDc0Zjk=',
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    spotifyToken.access_token = spotifyResponse.data.access_token;
    spotifyToken.refresh_token = spotifyResponse.data.refresh_token;
    spotifyToken.token_type = spotifyResponse.data.token_type;
    spotifyToken.scope = spotifyResponse.data.scope;
    console.log(spotifyResponse.data);
    res.redirect('http://localhost:3000');
  })


