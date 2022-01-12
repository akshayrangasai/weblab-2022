"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    authToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    timeStamp: { type: Date, required: true }
});
const authModel = (0, mongoose_1.model)('authModel', authSchema);
module.exports = authModel;
//# sourceMappingURL=authtoken.js.map