const express = require('express')
const app = express()
const port = 8888
const queryString = require("query-string");
const axios = require("axios");

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send(
      "<a href='https://accounts.spotify.com/authorize?client_id=" +
        '13c6a1850e5d4dd2814971fbac941087' +
        "&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-top-read'>Sign in</a>"
    );
  });
app.get("/account", async (req,res) => {
    res.send("WELCOME FINALLY MADE IT")
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
    console.log(spotifyResponse.data);
    res.redirect('http://localhost:8888/account')
  })