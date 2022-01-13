//import bodyParser from "body-parser";
import {Router} from "express";

const spotify = require('../src/integrationModules/spotifyModules');


const serviceRouter = Router();
var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "http://localhost:3000/connectService/spotify";


/* Spotify Endpoints */

serviceRouter.get('/spotifyTrigger', spotify.spotifyOAuthBegin);
serviceRouter.get('/spotify', spotify.spotifyOAuthEnd);
serviceRouter.get('/getUserPlaylists', spotify.getUserPlaylists);

module.exports =  serviceRouter;