import { model, Schema } from 'mongoose';
import { IMessageSchema } from './types/message.interface';

const MessageSchema = new Schema<IMessageSchema>({
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<IMessageSchema>('Message', MessageSchema);