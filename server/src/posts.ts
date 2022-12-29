//const mongoose = require('mongoose');
const postModel = require('./models/posts');
const appAuth = require('../middleware/appAuthentication');
/*
Schema for reference 

const postSchema: Schema = new Schema({

    user: {type: String, required : true},
    postTitle: {type: String, required : true},
    postDescription: {type: String, required : false},
    upvotes: {type: Number, required : true},
    downvotes: {type: Number, required : true},
    playlistURL: {type: String, required : true},
    playlistName: {type: String, required : true},
    playlistID: {type: String, required : true},
    whichApp: {type: String, required : false},
    playlistItems: {type: [String], required : false},
    playlistItrmIDs: {type: [String], required : true},
    timestamp: {type: Date, required : true}
    
});

*/

const getAllPosts = async (req:any,res:any) => {

    console.log(req.cookies);

    const allPosts = await postModel.find().lean().then((response:any, err:any) => {console.log(JSON.stringify(response)); res.send(response);});
};

const addRandomData = (req:any, res:any) => {

    const user_name = res.locals.user || 'Rorz';
    const post_title = req.body.postTitle || 'This is test data';
    const post_desc = req.body.postDescription || 'This is sample description';
    const purl = req.body.playlistURL || 'This is test data';
    console.log('Add data Called');
    console.log(req.body);

const newData:any = new postModel(

    {
    user: user_name,
    postTitle: post_title,
    postDescription: post_desc,
    upvotes: 10,
    downvotes: 10,
    playlistURL: purl,
    playlistName: 'TBD',
    playlistID: 'TBD',
    whichApp: 'spotify',
    playlistItems: ['lol'],
    playlistItrmIDs: ['lol'],
    timestamp: new Date()


    }



);

newData.save().then( (response:any, err:any) => {


    console.log(response);

    if(err){
    res.error(500).send(err);
    }
    else{
    res.redirect('http://localhost:3000/posts/post/'+response._id);
    }
}

);

};

const getPost = (req:any, res:any) => {

    postModel.find({ _id : req.params.id}).lean().then((answer:any, err:any) => res.send(answer));

}

const upvotePost = (req:any, res:any) => {

    postModel.findOneAndUpdate({ _id : req.params.id}, {$inc:{'upvotes':1}}).then((answer:any, err:any) => {if(!err) {res.sendStatus(200);console.log(answer.upvotes)}});

}

const downvotePost = (req:any, res:any) => {

    postModel.findOneAndUpdate({ _id : req.params.id}, {$inc:{'downvotes':1}}).then((answer:any, err:any) => {if(!err) {res.sendStatus(200);console.log(answer.downvotes)}});

}

module.exports = {getAllPosts, addRandomData, getPost, upvotePost, downvotePost};