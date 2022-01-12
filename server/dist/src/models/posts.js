"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    postTitle: { type: String, required: true },
    postDescription: { type: String, required: false },
    upvotes: { type: Number, required: true },
    downvotes: { type: Number, required: true },
    playlistURL: { type: String, required: true },
    playlistName: { type: String, required: true },
    playlistID: { type: String, required: true },
    whichApp: { type: String, required: false },
    playlistItems: { type: [String], required: false },
    playlistItrmIDs: { type: [String], required: true },
    timestamp: { type: Date, required: true }
});
const postModel = (0, mongoose_1.model)('postModel', postSchema);
module.exports = postModel;
//# sourceMappingURL=posts.js.map