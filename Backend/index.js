const express = require('express')
const app = express()
const port = 8888
const queryString = require("query-string");
const axios = require("axios");

const spotifyToken = {
  access_token: '',
  token_type: '',
  refresh_token: '',
  scope: ''
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
    "https://api.spotify.com/v1/me/top/tracks?limit=50",
    {
      headers: {
        Authorization: "Bearer " + spotifyToken.access_token,
      },
    }
  );
  res.send(topTracks.data);
  console.log(topTracks);
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
  res.send(topArtists.data);
  console.log(topArtists);
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
    res.redirect('http://localhost:8888/getTopArtists')
  })


  