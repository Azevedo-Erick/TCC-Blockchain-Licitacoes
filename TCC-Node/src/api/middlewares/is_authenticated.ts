import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../../configs/config';
import AuthenticatedRequest from '../auth/authenticated_request';

export default function isAuthenticated(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch (err) {
        res.status(401);
        if (err instanceof jwt.TokenExpiredError) {
            throw new Error('TokenExpiredError');
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }

    return next();
}
