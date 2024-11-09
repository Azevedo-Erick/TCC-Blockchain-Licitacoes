import hashToken from '../../api/auth/hash_token';
import container from '../../di/container';
import { PrismaClientProvider } from '../providers/prisma_client_provider';

const prisma = container.get(PrismaClientProvider).getPrisma();

type RefreshToken = {
    refreshToken: string;
    userId: string;
};
function addRefreshTokenToWhitelist({ refreshToken, userId }: RefreshToken) {
    return prisma.refreshToken.create({
        data: {
            hashedToken: hashToken(refreshToken),
            userId,
            expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }
    });
}

// used to check if the token sent by the client is in the database.
function findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
        where: {
            hashedToken: hashToken(token)
        }
    });
}

// soft delete tokens after usage.
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
