"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appAuthentication_1 = require("../middleware/appAuthentication");
var postsRouter = require("../routes/posts");
var serviceRouter = require('../routes/connectServices');
const bodyParser = require('body-parser');
var cors = require('cors');
const users = require('./users');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const app = (0, express_1.default)();
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(cookieParser());
//app.use();
// Use __CAPS for constants and paths
const __PORT = 3000;
const mongoURL = "mongodb://127.0.0.1:27017/weblab";
//const mongoURL:string = "mongodb+srv://iy125:84cb47gV_m@cluster0.phipo.mongodb.net/Weblab";
mongoose.connect(mongoURL);
const mongoConnection = mongoose.connection;
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoConnection.on('error', console.error.bind(console, 'Console Error'));
mongoConnection.once('open', () => {
    app.use(session({
        store: mongoStore.create({ client: mongoConnection.client }),
        resave: false,
        secret: 'test',
        cookie: {
            maxAge: 3600000000,
            httpOnly: false,
            sameSite: 'none',
            secure: false
        },
        unset: 'destroy'
    }));
    app.get('/login', users.loginPage);
    app.get('/signup', users.signupPage);
    app.get('/logout', users.logout);
    app.post('/login', users.checkLogin);
    app.post('/signup', users.newSignup);
    app.use('/posts', appAuthentication_1.isAuth, postsRouter);
    app.use('/connectService', appAuthentication_1.isAuth, serviceRouter);
    app.listen(__PORT, () => console.log("Listening on port", __PORT));
});
//# sourceMappingURL=index.js.map