//import bodyParser from "body-parser";
import {Router} from "express";

const spotify = require('../src/integrationModules/spotifyModules');

/*
const express = require('express');
let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
*/
const serviceRouter = Router();
var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "http://localhost:3000/connectService/spotify";



/*

*/



/*
*/

serviceRouter.get('/spotifyTrigger', spotify.spotifyOAuthBegin);


serviceRouter.get('/spotify', spotify.spotifyOAuthEnd);

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
module.exports =  serviceRouter;