import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface AuthenticatedRequest extends Request {
    payload?: string | JwtPayload;
}
