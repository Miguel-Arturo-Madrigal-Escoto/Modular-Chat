"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    base_user: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.js.map