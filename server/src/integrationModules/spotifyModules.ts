const authModel = require('../models/authtoken');

var spotifyWebAPI = require('spotify-web-api-node');
var scopes = ['user-read-private', 'user-read-email'];
var spotifySecret = "84e54979928a4ab0a4688209f71ee924";
var spotifyClient = "68fada0983aa44bab35d51a6c88bad7a";
var redirectURI = "http://localhost:3000/connectService/spotify";


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


            const token = new authModel({

                'user': req.session.user,
                'authToken': data.body['access_token'],
                'refreshToken': data.body['refresh_token'],
                'timeStamp': data.headers['date']

            });

           try{ 
               
            await token.save();
            res.send(data.body);

           } catch(err) {

            res.send(err);

           }

           
          },
          function(err:string) {
            console.log('Something went wrong!', err);
          }

    );
    


}
export {spotifyOAuthBegin, spotifyOAuthEnd};