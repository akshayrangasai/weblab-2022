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
exports.spotifyOAuthEnd = exports.spotifyOAuthBegin = void 0;
const authModel = require('../models/authtoken');
var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "http://localhost:3000/connectService/spotify";
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
            const token = new authModel({
                'user': req.session.user,
                'authToken': data.body['access_token'],
                'refreshToken': data.body['refresh_token'],
                'timeStamp': data.headers['date']
            });
            try {
                yield token.save();
                res.send(data.body);
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
//# sourceMappingURL=spotifyModules.js.map