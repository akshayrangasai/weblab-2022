"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const express = require('express');
const postsRouter = (0, express_1.Router)();
const postModel = require('../src/posts');
//postsRouter.get('/', (req, res) => {console.log("Woah hit posts"); res.send("Posts Baby")});
postsRouter.get('/', postModel.getAllPosts);
postsRouter.get('/new/add', postModel.addRandomData);
postsRouter.get('/:id', postModel.getPost);
//61de43289dd9966793687eb4
module.exports = postsRouter;
//# sourceMappingURL=posts.js.map