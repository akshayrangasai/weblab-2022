import {Router} from "express";
//const express = require('express');
const postsRouter = Router();
const postModel = require('../src/posts');


//postsRouter.get('/', (req, res) => {console.log("Woah hit posts"); res.send("Posts Baby")});
postsRouter.get('/', postModel.getAllPosts);
postsRouter.get('/new/add', postModel.addRandomData);
postsRouter.get('/:id', postModel.getPost);
postsRouter.get('/:id/upvote', postModel.getPost);
postsRouter.get('/:id/downvote', postModel.getPost);

//61de43289dd9966793687eb4


module.exports =  postsRouter;