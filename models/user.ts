import { model, Schema } from 'mongoose';
import { IUserSchema } from './types/user.interface';

const UserSchema = new Schema<IUserSchema>({
    // Note: Django base_user id
    base_user: { 
        type: Number,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'company'],
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