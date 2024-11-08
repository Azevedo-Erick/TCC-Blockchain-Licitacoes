import { PrismaClient } from '@prisma/client';
import AdicionarLicitacaoDTO from '../dtos/adicionar_licitacao_dto';
import { StorageLicitacoesService } from './storage_licitacoes_service';
import createAuction from '../../blockchain/functions/licitacoes_concorrencia_selecao_menor_preco/create_auction';
import adicionarLicitacao from '../../blockchain/functions/storage_licitacoes/adicionar_licitacao';
import AdicionarLicitacaoStorageDTO from '../dtos/adicionar_licitacao_storage_dto';
import buscarHistoricoLicitacao from '../../blockchain/functions/licitacoes_concorrencia_selecao_menor_preco/buscar_historico_licitacao';
import { inject, injectable } from 'inversify';
import { PrismaClientProvider } from '../providers/prisma_client_provider';

@injectable()
export class LicitacaoConcorrenciaSelecaoMenorPrecoService {
    private readonly prisma: PrismaClient;
    private readonly storageLicitacoes: StorageLicitacoesService;

    constructor(
        @inject(PrismaClientProvider) prisma: PrismaClientProvider,
        @inject(StorageLicitacoesService)
        storageLicitacoes: StorageLicitacoesService
    ) {
        this.prisma = prisma.getPrisma();
        this.storageLicitacoes = storageLicitacoes;
    }

    async realizarCandidatura() {}

    async buscarLicitacaoPorId(id: number) {}

    async buscarHistorico(from: string, enderecoContrato: string) {
        return await buscarHistoricoLicitacao(from, enderecoContrato);
    }

    async adicionarLicitacao(licitacao: AdicionarLicitacaoDTO) {
        const {
            enderecoRemetente,
            tituloLicitacao,
            descricaoLicitacao,
            dataInicio,
            dataInicioCandidaturas,
            dataFimCandidaturas,
            etp,
            edital
        } = licitacao;
        const enderecoLicitacao = (await createAuction(
            enderecoRemetente,
            tituloLicitacao,
            descricaoLicitacao,
            etp,
            edital,
            dataInicio,
            dataInicioCandidaturas,
            dataFimCandidaturas
        )) as string;

        const storageLicitacaoDto: AdicionarLicitacaoStorageDTO = {
            enderecoRemetente: enderecoRemetente,
            enderecoLicitacao: enderecoLicitacao,
            tituloLicitacao: tituloLicitacao,
            descricaoLicitacao: descricaoLicitacao,
            dataInicio: dataInicio,
            dataInicioCandidaturas: dataInicioCandidaturas,
            dataFimCandidaturas: dataFimCandidaturas,
            etp: etp,
            edital: edital,
            estagio: '0'
        };
        await this.storageLicitacoes.adicionarLicitacao(storageLicitacaoDto);
    }

    async atualizarSituacoes() {
        console.log('Atualizando situações das licitações...');
    }
}
