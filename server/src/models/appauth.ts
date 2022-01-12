import { Model, model, Schema, Document } from "mongoose";

interface appAuth extends Document{
    user: string,
    email:string,
    password: string,
    timestamp: Date,
    //expiryTime: number
}

const appAuthSchema: Schema = new Schema({

    user: {type: String, required : true, unique : true},
    email: {type: String, required : true, unique: true},
    password: {type: String, required : true},
    timeStamp: {type: Date, required: true}
});

const appAuthModel: Model<appAuth> = model('appAuthModel', appAuthSchema);

module.exports = appAuthModel;