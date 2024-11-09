import { PrismaClient } from '@prisma/client';
import adicionarLicitacao from '../../blockchain/functions/storage_licitacoes/adicionar_licitacao';
import buscarTotalLicitacoes from '../../blockchain/functions/storage_licitacoes/buscar_total_licitacoes';
import AdicionarLicitacaoStorageDTO from '../dtos/adicionar_licitacao_storage_dto';
import { inject, injectable } from 'inversify';
import { PrismaClientProvider } from '../providers/prisma_client_provider';
import buscarLicitacoesStorage from '../../blockchain/functions/storage_licitacoes/buscar_licitacoes_storage';
import detalhesLicitacao from '../../blockchain/functions/licitacoes_concorrencia_selecao_menor_preco/detalhes_licitacao';
import consultarCandidatos from '../../blockchain/functions/licitacoes_concorrencia_selecao_menor_preco/consultar_candidatos';
import consultarDetalhesCandidatos from '../../blockchain/functions/licitacoes_concorrencia_selecao_menor_preco/consultar_detalhes_candidatura';

@injectable()
export class StorageLicitacoesService {
    private readonly prisma: PrismaClient;

    constructor(@inject(PrismaClientProvider) prisma: PrismaClientProvider) {
        this.prisma = prisma.getPrisma();
    }

    async buscarLicitacoes() { }

    async sincronizarLicitacoes() {
        const storageLicitacoes =
            await this.prisma.blocoStorageLicitacoes.findFirst();
        if (!storageLicitacoes) {
            throw new Error('Contrato de licitações não encontrado');
        }

        const licitacoesStorageBlockchain = await buscarLicitacoesStorage(
            storageLicitacoes.hash
        );

        for (const licitacao of licitacoesStorageBlockchain) {
            const detalhes = (await detalhesLicitacao(
                licitacao.enderecoBloco
            )) as any;

            let licitacaoBD = await this.prisma.blocoLicitacao.findFirst({
                where: { enderecoBloco: licitacao.enderecoBloco }
            });

            if (!licitacaoBD) {
                licitacaoBD = await this.prisma.blocoLicitacao.create({
                    data: {
                        enderecoBloco: licitacao.enderecoBloco,
                        titulo: detalhes.titulo,
                        descricao: detalhes.descricao,
                        hashEtp: detalhes.hashETP,
                        hashEdital: detalhes.hashEdital,
                        dataInicio: new Date(detalhes.dataInicio * 1000),
                        dataInicioCandidaturas: new Date(
                            detalhes.dataInicioCandidaturas * 1000
                        ),
                        dataFimCandidaturas: new Date(
                            detalhes.dataFimCandidaturas * 1000
                        ),
                        estagio: detalhes.estagio
                    }
                });
            } else {
                const precisaAtualizar =
                    licitacaoBD.titulo !== detalhes.titulo ||
                    licitacaoBD.descricao !== detalhes.descricao ||
                    licitacaoBD.hashEtp !== detalhes.hashETP ||
                    licitacaoBD.hashEdital !== detalhes.hashEdital ||
                    licitacaoBD.estagio !== detalhes.estagio ||
                    licitacaoBD.dataInicio.getTime() !==
                    detalhes.dataInicio * 1000 ||
                    licitacaoBD.dataInicioCandidaturas.getTime() !==
                    detalhes.dataInicioCandidaturas * 1000 ||
                    licitacaoBD.dataFimCandidaturas.getTime() !==
                    detalhes.dataFimCandidaturas * 1000;

                if (precisaAtualizar) {
                    await this.prisma.blocoLicitacao.update({
                        where: { enderecoBloco: licitacao.enderecoBloco },
                        data: {
                            titulo: detalhes.titulo,
                            descricao: detalhes.descricao,
                            hashEtp: detalhes.hashETP,
                            hashEdital: detalhes.hashEdital,
                            estagio: detalhes.estagio,
                            dataInicio: new Date(detalhes.dataInicio * 1000),
                            dataInicioCandidaturas: new Date(
                                detalhes.dataInicioCandidaturas * 1000
                            ),
                            dataFimCandidaturas: new Date(
                                detalhes.dataFimCandidaturas * 1000
                            )
                        }
                    });
                }
            }

            const candidatosBlockchain = await consultarDetalhesCandidatos(
                licitacao.enderecoBloco
            );
            for (const candidato of candidatosBlockchain) {
                //const dadosCandidato = await contrato.methods.candidatos(enderecoCandidato).call();

                const candidatoBD = await this.prisma.candidato.findFirst({
                    where: { endereco: candidato.endereco }
                });

                if (!candidatoBD) {
                    await this.prisma.candidato.create({
                        data: {
                            endereco: candidato.endereco,
                            hashCandidatura: candidato.hashCandidatura,
                            timestampEnvio: new Date(
                                candidato.timestampEnvio * 1000
                            ),
                            licitacaoId: licitacaoBD.id
                        }
                    });
                }
            }
        }
    }

    async buscarLicitacaoPorId(id: number) { }

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
