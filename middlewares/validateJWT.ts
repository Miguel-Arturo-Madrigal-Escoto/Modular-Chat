import { Request, Response, NextFunction } from 'express';

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
    // TODO: extract authorization header and validate the JWT
}
