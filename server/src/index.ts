import express from "express";
const app = express();
// Use __CAPS for constants and paths
const __PORT = 3000;

app.get('/', (req, res) => res.send("Hello to you too"))

app.listen(__PORT, () => console.log("Listening on port", __PORT));
