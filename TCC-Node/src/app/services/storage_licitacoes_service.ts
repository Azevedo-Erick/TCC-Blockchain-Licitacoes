import { PrismaClient } from '@prisma/client';
import adicionarLicitacao from '../../blockchain/functions/storage_licitacoes/adicionar_licitacao';
import buscarTotalLicitacoes from '../../blockchain/functions/storage_licitacoes/buscar_total_licitacoes';
import AdicionarLicitacaoStorageDTO from '../dtos/adicionar_licitacao_storage_dto';
import { inject, injectable } from 'inversify';
import { PrismaClientProvider } from '../providers/prisma_client_provider';

@injectable()
export class StorageLicitacoesService {
    private readonly prisma: PrismaClient;

    constructor(@inject(PrismaClientProvider) prisma: PrismaClientProvider) {
        this.prisma = prisma.getPrisma();
    }

    async buscarLicitacoes() {}

    async sincronizarLicitacoes() {}

    async buscarLicitacaoPorId(id: number) {}

    async buscarTotal() {
        const storageLicitacoes =
            await this.prisma.blocoStorageLicitacoes.findFirst();

        if (!storageLicitacoes) {
            throw new Error('Contrato de licitações não encontrado');
        }

        return await buscarTotalLicitacoes(storageLicitacoes.hash);
    }

    async adicionarLicitacao(licitacao: AdicionarLicitacaoStorageDTO) {
        const storageLicitacoes =
            await this.prisma.blocoStorageLicitacoes.findFirst();

        if (!storageLicitacoes) {
            throw new Error('Contrato de licitações não encontrado');
        }

        return await adicionarLicitacao(storageLicitacoes.hash, licitacao);
    }
}
