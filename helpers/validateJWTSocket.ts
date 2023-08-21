import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../middlewares/types/jwt.interface';


export const validateJWTSocket = (authToken: string) => {
    try {
        const tokenPayload = jwt.verify(authToken, process.env.SECRET_JWT_KEY!) as ITokenPayload;
        
        return {
            ok: true,
            base_user: tokenPayload.user_id
        }
     
    } catch (error) {
        return {
            ok: false,
            base_user: null
        }
    }
}
