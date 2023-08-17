import { Schema } from 'mongoose';

export interface IMessageSchema {
    from: Schema.Types.ObjectId;
    to: Schema.Types.ObjectId;
    text: string;
}