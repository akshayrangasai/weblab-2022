import {Router} from "express";
import {isAuth} from '../middleware/appAuthentication';
//const express = require('express');
const postsRouter = Router();
const postModel = require('../src/posts');



//postsRouter.get('/', (req, res) => {console.log("Woah hit posts"); res.send("Posts Baby")});
postsRouter.get('/', postModel.getAllPosts);
postsRouter.post('/new/add', postModel.addRandomData);
postsRouter.get('/post/:id', postModel.getPost);
postsRouter.get('/upvote/:id', isAuth, postModel.upvotePost);
postsRouter.get('/downvote/:id', isAuth, postModel.downvotePost);

//61de43289dd9966793687eb4


module.exports =  postsRouter;