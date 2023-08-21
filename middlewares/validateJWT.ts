import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ITokenPayload } from './types/jwt.interface';

/**
 * This middleware validates that the JWT (Authorization header) exists
 * and checks if it is correct (has not been manipulated).
 *
 * @param {express.Request} req - The incoming request to the endpoint.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - To proceed to the next validation.
 * @return {json} next() function will be called if JWT validation is successful.
 * 
 */
export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Django access token
        const jwtToken = req.headers.authorization; 

        if (!jwtToken){
            return res.status(401).json({
                ok: false,
                msg: 'Missing access token'
            });
        }

        const tokenPayload = jwt.verify(jwtToken, process.env.SECRET_JWT_KEY!) as ITokenPayload;
        req.body.base_user = tokenPayload.user_id;

        // call the next middleware (if exists)
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'The provided token is invalid or has already expired.'
        });
    }
}
