"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var postsRouter = require("./routes/posts");
var authRouter = require('./routes/auth');
const app = (0, express_1.default)();
// Use __CAPS for constants and paths
const __PORT = 3000;
app.get('/', (req, res) => res.send("Hello to you too"));
app.use('/posts', postsRouter);
app.use('/auth', authRouter);
app.listen(__PORT, () => console.log("Listening on port", __PORT));
//# sourceMappingURL=index.js.map