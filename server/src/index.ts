import express from "express";
var postsRouter = require("./routes/posts");
var authRouter = require('./routes/auth');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
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
app.use('/posts', postsRouter);
app.use('/auth', authRouter);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Console Error'));
db.once('open', () => app.listen(__PORT, () => console.log("Listening on port", __PORT)));


