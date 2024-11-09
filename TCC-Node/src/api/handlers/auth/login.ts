import jwt from '../../auth/jwt_utils';
import { NextFunction, Request, Response } from 'express';
import userService from '../../../app/services/user_service';
import auth_service from '../../../app/services/auth_service';
import bcrypt from 'bcrypt';

export default async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('Preencha o email e a senha.');
        }

        const existingUser = await userService.findUserByEmail(email);

        if (!existingUser) {
            res.status(403);
            throw new Error('Credenciais inválidas.');
        }

        const validPassword = await bcrypt.compare(
            password,
            existingUser.senha
        );
        if (!validPassword) {
            res.status(403);
            throw new Error('Credenciais inválidas.');
        }

        const { accessToken, refreshToken } = jwt.generateTokens(existingUser);
        await auth_service.addRefreshTokenToWhitelist({
            refreshToken,
            userId: existingUser.id
        });

        res.json({
            access_token: accessToken,
            refresh_token: refreshToken
        });
    } catch (err) {
        next(err);
    }
}
