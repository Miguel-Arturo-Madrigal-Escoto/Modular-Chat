"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Message', MessageSchema);
//# sourceMappingURL=message.js.map