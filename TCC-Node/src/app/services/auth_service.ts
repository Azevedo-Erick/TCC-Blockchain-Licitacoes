import { PrismaClient } from '@prisma/client';
import hashToken from '../../api/auth/hash_token';
import { PrismaClientProvider } from '../providers/prisma_client_provider';
import { inject, injectable } from 'inversify';

type RefreshToken = {
    refreshToken: string;
    userId: string;
};

@injectable()
export default class AuthService {
    private readonly prisma: PrismaClient;

    constructor(
        @inject(PrismaClientProvider) prismaClientProvider: PrismaClientProvider
    ) {
        this.prisma = prismaClientProvider.getPrisma();
    }

    public async addRefreshTokenToWhitelist({
        refreshToken,
        userId
    }: RefreshToken) {
        return this.prisma.refreshToken.create({
            data: {
                hashedToken: hashToken(refreshToken),
                userId,
                expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
            }
        });
    }

    public async buscarRefreshToken(token: string) {
        return prisma.refreshToken.findUnique({
            where: {
                hashedToken: hashToken(token)
            }
        });
    }

    public async deleteRefreshTokenById(id: string) {
        return this.prisma.refreshToken.update({
            where: {
                id
            },
            data: {
                revoked: true
            }
        });
    }

    public async revokeToken(userId: string) {
        return prisma.refreshToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        });
    }
}

/* 
function addRefreshTokenToWhitelist({ refreshToken, userId }: RefreshToken) {
    return prisma.refreshToken.create({
        data: {
            hashedToken: hashToken(refreshToken),
            userId,
            expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }
    });
}

function findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
        where: {
            hashedToken: hashToken(token)
        }
    });
}

function deleteRefreshTokenById(id: string) {
    return prisma.refreshToken.update({
        where: {
            id
        },
        data: {
            revoked: true
        }
    });
}

function revokeTokens(userId: string) {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

export default {
    addRefreshTokenToWhitelist,
    findRefreshToken,
    deleteRefreshTokenById,
    revokeTokens
};
 */
