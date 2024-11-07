import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class PrismaClientProvider {
    private readonly prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    getPrisma() {
        return this.prisma;
    }
}
