import { model, Schema } from 'mongoose';
import { IUserSchema } from './types/user.interface';

const UserSchema = new Schema<IUserSchema>({
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

export default model<IUserSchema>('User', UserSchema);