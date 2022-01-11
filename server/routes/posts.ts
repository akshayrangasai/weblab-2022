import {Router} from "express";
//const express = require('express');
const postsRouter = Router();

postsRouter.get('/', (req, res) => {console.log("Woah hit posts"); res.send("Posts Baby")});

module.exports =  postsRouter;