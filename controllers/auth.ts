import { Request, Response } from 'express';
import { ISignUpBody, IUpdateUser } from './types/auth.interfaces';
import User from '../models/user';

/**
 * Handles user registration if doesn't exists. Since this controller uses
 * the Django JWT authentication, will only be called if user logs in
 * correctly through the UI (React.js).
 *
 * @param {express.Request} req - The incoming request to the endpoint.
 * @param {express.Response} res - The response object.
 * @return {json} json representing if user was created or already existed.
 * 
 */
export const signUpController = async (req: Request<{},{},ISignUpBody>, res: Response) => {
    try {
        const { base_user, name, email, role } = req.body;
        const user = await User.findOne({ 
            base_user, 
            email
        });

        if (user){
            // The user exists, return the user
            return res.status(200).json({
                ok: true,
                id: user.id,
                base_user: user.base_user,
                email: user.email,
                name: user.name
            });
        } 
        else {
            // Create a user instance and save it into the collection
            const newUser = new User({
                base_user,
                name,
                email,
                role
            });
            await newUser.save();

            return res.status(201).json({
                ok: true,
                id: newUser.id,
                base_user: newUser.base_user,
                email: newUser.email,
                name: newUser.name
            });
        }


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'An unexpected error ocurred. Please try again or contact the administrator.'
        });
    } 
}

export const updateUserController = async (req: Request<{},{},IUpdateUser>, res: Response) => {
    try {
        const { base_user, name } = req.body;

        await User.findOneAndUpdate({ base_user }, { name }, { new: true });

        return res.status(200).json();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'An unexpected error ocurred. Please try again or contact the administrator.'
        });
    }
}