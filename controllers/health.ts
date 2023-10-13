import { Request, Response } from 'express';


export const healthCheckController = async (req: Request, res: Response) => {
    try {
        // Default route to check if the app (chat) is working
        return res.json({
            ok: true,
            msg: 'The application is ok and running.'
        });

    } catch (error) {
        return res.json({
            ok: false,
            msg: 'An unexpected error ocurred. Please try again or contact the administrator.'
        });
    }
}
