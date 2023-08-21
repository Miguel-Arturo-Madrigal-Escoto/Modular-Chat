import { Request, Response } from 'express';
import Message from '../models/message';
import { IChatMessagesBody, IChatMessagesParams } from './types/messages.interfaces';

/**
 * Retrieves all the messages (ordered) where the authenticated user (JWT)
 * participates with the other person (to - param.)
 *
 * @param {Request} req - The incoming request to the endpoint.
 * @param {Response} res - The response object.
 * @return {json} json with all of the messages described above.
 * 
 */
export const chatMessagesController = async (req: Request<IChatMessagesParams,{},IChatMessagesBody>, res: Response) => {
    try {
        // TODO: base_user (Django base_user id) will be extracted from the JWT, not from the req.body.
        const from = req.body.base_user;
        const { to } = req.params;
        
        const messages = await Message.find({
            $or: [
                { from, to }, 
                { from: to, to: from }
            ]
        }).sort({ createdAt: 'asc' });

        return res.json({
            ok: true,
            messages
        });
    
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'An unexpected error ocurred. Please try again or contact the administrator.'
        });
    }
}