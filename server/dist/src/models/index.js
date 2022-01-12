"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var postsRouter = require("./routes/posts");
var authRouter = require('./routes/auth');
const users = require('./src/users');
const mongoose = require('mongoose');
const session = require('express-connect');
const mongoStore = require('connect-mongo');
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use __CAPS for constants and paths
const __PORT = 3000;
//Database Stuff
/*const mongoURL:string = "mongodb://localhost:27017/weblab";

mongoose.connect(mongoURL,{
    newURLParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
*/
const mongoConnection = mongoose.connection;
app.use(session({
    store: mongoStore.create({ mongoConnection }),
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true
    }
}));
app.get('/login', users.loginPage);
app.get('/signup', users.signupPage);
app.post('/login', users.checkLogin);
app.post('/signup', users.newSignup);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);
mongoConnection.on('error', console.error.bind(console, 'Console Error'));
mongoConnection.once('open', () => app.listen(__PORT, () => console.log("Listening on port", __PORT)));
//# sourceMappingURL=index.js.map