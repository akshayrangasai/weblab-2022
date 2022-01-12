"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appAuthSchema = new mongoose_1.Schema({
    user: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timeStamp: { type: Date, required: true }
});
const appAuthModel = (0, mongoose_1.model)('appAuthModel', appAuthSchema);
module.exports = appAuthModel;
//# sourceMappingURL=appauth.js.map