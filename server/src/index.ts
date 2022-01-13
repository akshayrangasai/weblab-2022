import express from "express";
import {isAuth} from '../middleware/appAuthentication';
var postsRouter = require("../routes/posts");
var serviceRouter = require('../routes/connectServices');
const bodyParser = require('body-parser');

const users = require('./users');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');


const app = express();



//app.use();


// Use __CAPS for constants and paths
const __PORT = 3000;


const mongoURL:string = "mongodb://127.0.0.1:27017/weblab";
mongoose.connect(mongoURL)

const mongoConnection = mongoose.connection;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({

    store: mongoStore.create({client: mongoConnection.client}),
    resave: false,
    secret:'test',
    cookie: {
        maxAge: 36000
    },
    unset: 'destroy'


}));

app.get('/login', users.loginPage);
app.get('/signup', users.signupPage);
app.get('/logout', users.logout);
app.post('/login', users.checkLogin);
app.post('/signup', users.newSignup);
app.use('/posts', postsRouter);
app.use('/connectService', isAuth, serviceRouter);


mongoConnection.on('error', console.error.bind(console, 'Console Error'));
mongoConnection.once('open', () => app.listen(__PORT, () => console.log("Listening on port", __PORT)));


