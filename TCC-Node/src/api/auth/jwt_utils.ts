import { Usuario } from '@prisma/client';
import jsonwebToken from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_ACCESS_SECRET } from '../../configs/config';

function generateAccessToken(user: Usuario) {
    return jsonwebToken.sign({ userId: user.id }, JWT_ACCESS_SECRET, {
        expiresIn: '5m'
    });
}

function generateRefreshToken() {
    const token = crypto.randomBytes(16).toString('base64url');
    return token;
}

function generateTokens(user: Usuario) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    return { accessToken, refreshToken };
}

export default {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
};
