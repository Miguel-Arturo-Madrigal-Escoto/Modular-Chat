import User from '../models/user';
import Message from '../models/message';
import { IMessageSchema } from '../models/types/message.interface';

export const userConnect = async (base_user: number, connected: boolean) => {
    await User.findOneAndUpdate({ 
        base_user 
    }, { online: connected }, { new: true });
}

export const getUsers = async () => {
    const users = await User.find().sort('-online');
    return users;
}

export const saveMessage = async (message: IMessageSchema) => {
    const newMessage = new Message(message)
    newMessage.save();
    return newMessage;
}