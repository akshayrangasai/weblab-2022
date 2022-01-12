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
//import bodyParser from "body-parser";
const express_1 = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authModel = require('../src/models/authtoken');
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
var redirectURI = "http://localhost:3000/auth/spotify";
/*

*/
const mongoURL = "mongodb://127.0.0.1:27017/weblab";
mongoose.connect(mongoURL);
/*
*/
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
        return __awaiter(this, void 0, void 0, function* () {
            const token = new authModel({
                'user': 'akshayrangasai',
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
            /*console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);
            */
            // Set the access token on the API object to use it in later calls
            /*spotifyAPI.setAccessToken(data.body['access_token']);
            spotifyAPI.setRefreshToken(data.body['refresh_token']);
            
            res.send(data);*/
        });
    }, function (err) {
        console.log('Something went wrong!', err);
    });
});
/*

authRouter.get('/spotifyTest', async function(req:any,res:any) {


            const token = new authModel({

                'user': 'akshayrangasai',
                'authToken': "AABBCCDDEE",
                'refreshToken': "AABBCCDDEE",
                'timeStamp': new Date()

            });

           try{
               
            await token.save();
            res.send("Success");

           } catch(err) {

            res.send(err);

           }

            /*
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);
            */
// Set the access token on the API object to use it in later calls
/*

spotifyAPI.setAccessToken(data.body['access_token']);
spotifyAPI.setRefreshToken(data.body['refresh_token']);

res.send(data);


},
function(err:string) {
console.log('Something went wrong!', err);
}
);

*/
module.exports = authRouter;
//# sourceMappingURL=auth.js.map