import { Model, model, Schema, Document } from "mongoose";

interface authToken extends Document{
    user: string;
    authToken: string,
    refreshToken: string,
    timestamp: Date,
    //expiryTime: number
}

const authSchema: Schema = new Schema({

    user: {type: String, required : true, unique : true},
    authToken: {type: String, required : true},
    refreshToken: {type: String, required : true},
    timeStamp: {type: Date, required: true}
});

const authModel: Model<authToken> = model('authModel', authSchema);

module.exports = authModel;