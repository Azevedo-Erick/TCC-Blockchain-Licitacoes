import jwt from '../../auth/jwt_utils';
import { NextFunction, Request, Response } from 'express';
import userService from '../../../app/services/user_service';
import auth_service from '../../../app/services/auth_service';
import container from '../../../di/container';
import AuthService from '../../../app/services/auth_service';

const authService = container.get(AuthService);
export default async function registerUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const {
            email,
            password,
            nome
        }: { email: string; password: string; nome: string } = req.body;

        if (!email || !password) {
            res.status(400).send();
            throw new Error('Preencha o email e a senha.');
        }

        const existingUser = await userService.findUserByEmail(email);

        if (existingUser) {
            res.status(400).send();
            throw new Error('Credenciais inválidas.');
        }

        const user = await userService.createUserByEmailAndPassword({
            email: email,
            senha: password,
            nome: nome
        });
        const { accessToken, refreshToken } = jwt.generateTokens(user);
        await authService.addRefreshTokenToWhitelist({
            refreshToken,
            userId: user.id
        });

        res.json({
            access_token: accessToken,
            refresh_token: refreshToken
        });
    } catch (err) {
        next(err);
    }
}
