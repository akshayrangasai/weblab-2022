"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const express = require('express');
const postsRouter = (0, express_1.Router)();
postsRouter.get('/', (req, res) => { console.log("Woah hit posts"); res.send("Posts Baby"); });
module.exports = postsRouter;
//# sourceMappingURL=posts.js.map