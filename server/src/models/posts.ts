import { Model, model, Schema, Document } from "mongoose";

interface post extends Document{
    user: string;
    postTitle: string,
    postDescription: string,
    upvotes: number,
    downvotes: number,
    playlistURL: string,
    playlistName: string,
    playListID: string,
    whichApp: string, //Spotify or Youtube
    playlistItems: Array<string>,
    platListItemsIDs: Array<string>,
    timestamp: Date
    //expiryTime: number
}

const postSchema: Schema = new Schema({

    user: {type: String, required : true},
    postTitle: {type: String, required : true},
    postDescription: {type: String, required : false},
    upvotes: {type: Number, required : true},
    downvotes: {type: Number, required : true},
    playlistURL: {type: String, required : true},
    playlistName: {type: String, required : true},
    playlistID: {type: String, required : true},
    whichApp: {type: String, required : false},
    playlistItems: {type: [String], required : false},
    playlistItrmIDs: {type: [String], required : true},
    timestamp: {type: Date, required : true}
    
});

const postModel: Model<post> = model('postModel', postSchema);

module.exports = postModel;