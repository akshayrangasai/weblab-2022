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
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    const allPosts = yield postModel.find().lean().then((response, err) => { console.log(JSON.stringify(response)); res.send(response); });
});
const addRandomData = (req, res) => {
    const user_name = res.locals.user || 'Rorz';
    const post_title = req.body.postTitle || 'This is test data';
    const post_desc = req.body.postDescription || 'This is sample description';
    const purl = req.body.playlistURL || 'This is test data';
    console.log('Add data Called');
    console.log(req.body);
    const newData = new postModel({
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
    });
    newData.save().then((response, err) => {
        console.log(response);
        if (err) {
            res.error(500).send(err);
        }
        else {
            res.redirect('http://localhost:3000/posts/post/' + response._id);
        }
    });
};
const getPost = (req, res) => {
    postModel.find({ _id: req.params.id }).lean().then((answer, err) => res.send(answer));
};
const upvotePost = (req, res) => {
    postModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { 'upvotes': 1 } }).then((answer, err) => { if (!err) {
        res.sendStatus(200);
        console.log(answer.upvotes);
    } });
};
const downvotePost = (req, res) => {
    postModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { 'downvotes': 1 } }).then((answer, err) => { if (!err) {
        res.sendStatus(200);
        console.log(answer.downvotes);
    } });
};
module.exports = { getAllPosts, addRandomData, getPost, upvotePost, downvotePost };
//# sourceMappingURL=posts.js.map