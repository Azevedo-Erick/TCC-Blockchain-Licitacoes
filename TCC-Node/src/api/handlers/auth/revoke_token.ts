import { NextFunction, Request, Response } from 'express';
import container from '../../../di/container';
import AuthService from '../../../app/services/auth_service';

const authService = container.get(AuthService);

export default async function revokeToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { userId } = req.body;

        await authService.revokeToken(userId);
        res.json({
            message: `Token invalidado`
        });
    } catch (err) {
        next(err);
    }
}
