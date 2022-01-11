"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import bodyParser from "body-parser";
const express_1 = require("express");
const bodyParser = require('body-parser');
/*
const express = require('express');
let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
*/
const authRouter = (0, express_1.Router)();
var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "https://7499-2601-184-497f-8260-444e-8a9e-f7f0-f6b8.ngrok.io/auth/spotify";
authRouter.get('/spotifyTrigger', (req, res) => {
    try {
        var spotifyAPI = new spotifyWebAPI({
            redirectUri: redirectURI,
            clientId: spotifyClient,
            clientSecret: spotifySecret
        });
        res.redirect(spotifyAPI.createAuthorizeURL(scopes));
        console.log(spotifyAPI);
    }
    catch (err) {
        res.send(err);
    }
});
authRouter.get('/spotify', (req, res) => {
    console.log(req.query);
    let code = req.query.code;
    let spotifyAPI = new spotifyWebAPI({
        redirectUri: redirectURI,
        clientId: spotifyClient,
        clientSecret: spotifySecret
    });
    spotifyAPI.authorizationCodeGrant(code).then(function (data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
        // Set the access token on the API object to use it in later calls
        spotifyAPI.setAccessToken(data.body['access_token']);
        spotifyAPI.setRefreshToken(data.body['refresh_token']);
    }, function (err) {
        console.log('Something went wrong!', err);
    });
});
module.exports = authRouter;
//# sourceMappingURL=auth.js.map