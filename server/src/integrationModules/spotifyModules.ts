const authModel = require('../models/authtoken');

var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email', 'user-follow-modify','user-follow-read','user-library-modify','user-library-read','user-read-playback-position','user-top-read','user-read-recently-played','playlist-modify-private','playlist-read-collaborative','playlist-read-private','playlist-modify-public'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "http://localhost:3000/connectService/spotify";

/* 

There is some potential to manage getToken with sessions, have to read up more and figure out best way to implement

*/

async function getToken(user:string):Promise<any>{


    return authModel.findOne({user : user}).then(
        
        
        
        (data:any) => {

            if(data)
            {
            console.log(data)
            let spotify = new spotifyWebAPI({

                
                    clientId : spotifyClient,
                    clientSecret: spotifySecret,
                    refreshToken: data.refreshToken
                

            })
            
            return spotify.refreshAccessToken();
        }
        else
        {
            return Promise.resolve(null);

        }
        
        
        }
        
        
        
        );


}


/*

Spotify Auth Handlers

*/


const spotifyOAuthBegin = (req:any, res:any) => {
    
    try{
        
        var spotifyAPI = new spotifyWebAPI(
            {
                redirectUri: redirectURI,
                clientId : spotifyClient,
                clientSecret: spotifySecret
        
            }
        );
        
        res.redirect(spotifyAPI.createAuthorizeURL(scopes));
        console.log(spotifyAPI);
        }
        catch(err)
        {
            res.send(err);
        }

}

const spotifyOAuthEnd = (req:any,res:any) => {


    console.log(req.query);
    let code = req.query.code;
    let spotifyAPI = new spotifyWebAPI(

        {
            redirectUri: redirectURI,
            clientId : spotifyClient,
            clientSecret: spotifySecret 
        }
    );

    spotifyAPI.authorizationCodeGrant(code).then(
        async function(data:any) {        

           try{ 
             
            authModel.findOne({user: req.session.user}).then((datas:any) => {

            if(datas)
            {
                console.log('found some data!')
                let token = new authModel();
                token.updateOne({user: req.session.user}, {
                    'user': req.session.user,
                    'authToken': data.body['access_token'],
                    'refreshToken': data.body['refresh_token'],
                    'timeStamp': data.headers['date']
    
                }).then(res.send(data.body));
                
                
            }

            else

            {
                console.log('No Bueno');
                let token = new authModel({
                    'user': req.session.user,
                    'authToken': data.body['access_token'],
                    'refreshToken': data.body['refresh_token'],
                    'timeStamp': data.headers['date']
    
                });
                token.save().then((data:any) => res.send(data));
            }
                
                
                
            

           });
        } catch(err) {

            res.send(err);

           }

           
          },
          function(err:string) {
            console.log('Something went wrong!', err);
          }

    );
    


}

/* 

Spotify API Requests and Return Objects

*/

const getUserPlaylists = (req:any, res:any) => {

getToken(req.session.user).then((data:any) => { 
    
    if(data)
    {
        try{
            var api = new spotifyWebAPI({accessToken: data.body['access_token']});
            console.log('trying to connect to spotify');
            api.getUserPlaylists({limit:20}).then((data:any, err:any) =>  {res.send(data.body.items.map((data:any) => data.name))});
        }
        catch(err)
        {
            res.send(err);
        }
    }
    else
        res.redirect('./spotifyTrigger')
}

);

}



export {spotifyOAuthBegin, spotifyOAuthEnd, getUserPlaylists};