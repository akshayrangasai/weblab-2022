"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPlaylists = exports.spotifyOAuthEnd = exports.spotifyOAuthBegin = void 0;
const authModel = require('../models/authtoken');
var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email', 'user-follow-modify', 'user-follow-read', 'user-library-modify', 'user-library-read', 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'playlist-modify-private', 'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-public'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "http://localhost:3000/connectService/spotify";
function getToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return authModel.findOne({ user: user }).then((data) => {
            if (data) {
                console.log(data);
                let spotify = new spotifyWebAPI({
                    clientId: spotifyClient,
                    clientSecret: spotifySecret,
                    refreshToken: data.refreshToken
                });
                return spotify.refreshAccessToken();
            }
            else {
                return Promise.resolve(null);
            }
        });
    });
}
/*

Spotify Auth Handlers

*/
const spotifyOAuthBegin = (req, res) => {
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
};
exports.spotifyOAuthBegin = spotifyOAuthBegin;
const spotifyOAuthEnd = (req, res) => {
    console.log(req.query);
    let code = req.query.code;
    let spotifyAPI = new spotifyWebAPI({
        redirectUri: redirectURI,
        clientId: spotifyClient,
        clientSecret: spotifySecret
    });
    spotifyAPI.authorizationCodeGrant(code).then(function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                authModel.findOne({ user: req.session.user }).then((datas) => {
                    if (datas) {
                        console.log('found some data!');
                        let token = new authModel();
                        token.updateOne({ user: req.session.user }, {
                            'user': req.session.user,
                            'authToken': data.body['access_token'],
                            'refreshToken': data.body['refresh_token'],
                            'timeStamp': data.headers['date']
                        }).then(res.send(data.body));
                    }
                    else {
                        console.log('No Bueno');
                        let token = new authModel({
                            'user': req.session.user,
                            'authToken': data.body['access_token'],
                            'refreshToken': data.body['refresh_token'],
                            'timeStamp': data.headers['date']
                        });
                        token.save().then((data) => res.send(data));
                    }
                });
            }
            catch (err) {
                res.send(err);
            }
        });
    }, function (err) {
        console.log('Something went wrong!', err);
    });
};
exports.spotifyOAuthEnd = spotifyOAuthEnd;
/*

Spotify API Requests and Return Objects

*/
const getUserPlaylists = (req, res) => {
    getToken(req.session.user).then((data) => {
        if (data) {
            //console.log('The new access token is', data.body['access_token']); 
            //res.send(data);
            try {
                var api = new spotifyWebAPI({ accessToken: data.body['access_token'] });
                console.log('trying to connect to spotify');
                api.getUserPlaylists({ limit: 20 }).then((data, err) => { res.send(data.body.items.map((data) => data.name)); });
            }
            catch (err) {
                res.send(err);
            }
        }
        else
            res.redirect('./spotifyTrigger');
    });
    //console.log(token);
};
exports.getUserPlaylists = getUserPlaylists;
//# sourceMappingURL=spotifyModules.js.map