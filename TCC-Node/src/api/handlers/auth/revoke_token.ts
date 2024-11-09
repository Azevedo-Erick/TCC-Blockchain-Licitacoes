import { NextFunction, Request, Response } from 'express';
import auth_service from '../../../app/services/auth_service';

export default async function revokeToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { userId } = req.body;
        await auth_service.revokeTokens(userId);
        res.json({
            message: `Token invalidado`
        });
    } catch (err) {
        next(err);
    }
}
