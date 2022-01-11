import express from "express";
var postsRouter = require("./routes/posts");
var authRouter = require('./routes/auth');
const app = express();
// Use __CAPS for constants and paths
const __PORT = 3000;


//app.get('/', (req, res) => {res.send("This is terrible")});

//const credentials = require('./credentials/credentials_dev');
app.use('/posts', postsRouter);
app.use('/auth', authRouter);


app.listen(__PORT, () => console.log("Listening on port", __PORT));
