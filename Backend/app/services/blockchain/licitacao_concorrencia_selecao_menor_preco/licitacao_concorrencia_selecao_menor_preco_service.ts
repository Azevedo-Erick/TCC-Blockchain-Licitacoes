import { Web3 } from "web3";
import BaseBlockchainService from "../base_blockchain_service.js";
import licitacao_selecao_menor_preco_utils from "./licitacao_selecao_menor_preco_utils.js";
import CreateNewTransactionDTO from "../../../dtos/params/create_new_transaction_dto.js";
import DoCandidatureDTO from "../../../dtos/params/do_candidature_dto.js";
import LicitacaoDataRawOutputDto from "../../../dtos/result/licitacao_data_raw_output_dto.js";
import DetalhesLicitacaoOutputDto from "../../../dtos/result/licitacao_details_dto.js";
import CallCriarLicitacaoDto from "../../../dtos/params/create_licitacao_dto.js";
import { CandidatoDetalhesOutputDto } from "../../../dtos/result/candidato_detalhes_output_dto.js";
import TransactionResultDTO from "../../../dtos/result/transaction_result_dto.js";
import BlockCreationResultDTO from "../../../dtos/result/block_creation_result_dto.js";

export default class LicitacoesConcorrenciaSelecaoMenorPrecoService extends BaseBlockchainService {

    private readonly abi = licitacao_selecao_menor_preco_utils.abi;
    private readonly bytecode = licitacao_selecao_menor_preco_utils.bytecode;
    constructor(web3: Web3) {
        super(web3);
    }

    public async atualizarEstado(from: string, contractAdrres: string, privateKey: string) {
        const contrato = new this.web3.eth.Contract(this.abi, contractAdrres);
        const encodedABI = contrato.methods.atualizarEstado().encodeABI();

        const objetoTransacao = {
            to: contractAdrres,
            data: encodedABI,
            from: from,
            gas: 3000000,
            gasPrice: '0'
        };

        const rawTx = await this.assinarTransacao(objetoTransacao, privateKey, this.web3);
        const transaction = await this.web3.eth.sendSignedTransaction(rawTx);
        return transaction;
    }

    public async buscarHistoricoLicitacao(from: string, enderecoContrato: string) {
        const contract = new this.web3.eth.Contract(this.abi, enderecoContrato);
        return await contract.getPastEvents('allEvents', {
            filter: { from: from },
            fromBlock: 0,
            toBlock: 'latest'
        });
    }

    public async consultarCandidatos(contractAddress: string) {
        const contrato = new this.web3.eth.Contract(this.abi, contractAddress);
        const candidatosList = await contrato.methods.getCandidatos().call();
        return candidatosList;
    }

    public async consultarDetalhesCandidatos(contractAddress: string) {
        const contrato = new this.web3.eth.Contract(
            this.abi,
            contractAddress
        );

        const candidatosList: string[] = await contrato.methods
            .getCandidatos()
            .call();

        const candidatosDetalhes: CandidatoDetalhesOutputDto[] = await Promise.all(
            candidatosList.map(async (candidatoAddress) => {
                const candidatoDetalhes = (await contrato.methods
                    .candidatos(candidatoAddress)
                    .call()) as any;

                return {
                    endereco: candidatoDetalhes.endereco,
                    hashCandidatura: candidatoDetalhes.hashCandidatura,
                    timestampEnvio: parseInt(candidatoDetalhes.timestampEnvio, 10)
                };
            })
        );

        return candidatosDetalhes;
    }

    public async consultarEstagio(contractAddress: string) {

        const contrato = new this.web3.eth.Contract(this.abi, contractAddress);
        const estagioAtual = await contrato.methods.getEstagio().call();
        return Number(estagioAtual);
    }

    public async criarLicitacaoSelecaoMenorPreco(
        dto: CallCriarLicitacaoDto
    ): Promise<BlockCreationResultDTO> {
        try {
            const {
                enderecoRemetente: from,
                titulo,
                chaveRemetente,
                descricao,
                hashETP,
                hashEdital,
                dataInicio,
                dataInicioCandidaturas,
                dataFimCandidaturas
            } = dto;

            const transaction = await this.deployLicitacaoSelecaoMenorPrecoContract(
                from,
                chaveRemetente
            );

            if (!transaction) {
                throw new Error("Erro ao criar contrato de licitação");
            }

            const enderecoContrato = transaction.contractAddress;

            const contratoInstanciado = new this.web3.eth.Contract(
                this.abi,
                enderecoContrato
            );

            const encodedABI = contratoInstanciado.methods
                .criarLicitacao(
                    titulo,
                    descricao,
                    hashETP,
                    hashEdital,
                    dataInicio,
                    dataInicioCandidaturas,
                    dataFimCandidaturas
                )
                .encodeABI();
            const gasPrice = await this.web3.eth.getGasPrice();

            const tx = {
                from: from,
                to: contratoInstanciado.options.address,
                data: encodedABI,
                gasPrice: gasPrice,
                gas: 2000000
            };

            const signedTx = await this.web3.eth.accounts.signTransaction(
                tx,
                chaveRemetente
            );

            const receipt = await this.web3.eth.sendSignedTransaction(
                signedTx.rawTransaction
            );
            return {
                success: true,
                contractAddress: contratoInstanciado.options!.address!,
                blockHash: receipt.blockHash.toString()
            };
        }
        catch (error) {
            console.error(error);
            return {
                success: false,
                contractAddress: '',
                blockHash: ''
            };
        }
    }

    public async deployLicitacaoSelecaoMenorPrecoContract(
        enderecoRemetente: string,
        chavePrivada: string
    ): Promise<BlockCreationResultDTO> {
        const contrato = new this.web3.eth.Contract(
            this.abi
        );
        const deploy = contrato
            .deploy({
                data: this.bytecode,
                arguments: []
            })
            .encodeABI();

        const objetoTransacao = {
            data: deploy,
            from: enderecoRemetente,
            gas: 2273364,
            gasPrice: 0
        };

        const rawTx = await this.assinarTransacao(objetoTransacao, chavePrivada, this.web3);
        const transaction = await this.web3.eth.sendSignedTransaction(rawTx);
        return {
            success: true,
            contractAddress: transaction.contractAddress!
        };
    }

    async detalhesLicitacao(enderecoContrato: string): Promise<DetalhesLicitacaoOutputDto> {
        const contrato = new this.web3.eth.Contract(
            this.abi,
            enderecoContrato
        );

        const licitacaoData: LicitacaoDataRawOutputDto = await contrato.methods
            .licitacao()
            .call();

        return new DetalhesLicitacaoOutputDto(licitacaoData, enderecoContrato);
    }

    async enviarCandidatura(dto: DoCandidatureDTO): Promise<TransactionResultDTO> {

        const contrato = new this.web3.eth.Contract(this.abi, dto.enderecoContrato);
        const encodedABI = contrato.methods
            .enviarCandidatura(dto.proposta)
            .encodeABI();

        const objetoTransacao = {
            to: dto.enderecoContrato,
            data: encodedABI,
            from: dto.enderecoRemetente,
            gas: 3000000,
            gasPrice: '0'
        };

        const rawTx = await this.assinarTransacao(objetoTransacao, dto.chavePrivada, this.web3);
        const transaction = await this.web3.eth.sendSignedTransaction(rawTx);
        return {
            sucesso: true,
            mensagem: 'Candidatura enviada com sucesso',
            hashTransacao: transaction.transactionHash.toString()
        };
    }

    async finalizarLicitacao(dados: CreateNewTransactionDTO, privateKey: string): Promise<TransactionResultDTO> {

        const contrato = new this.web3.eth.Contract(this.abi, dados.to);
        const encodedABI = contrato.methods.finalizarLicitacao().encodeABI();

        const objetoTransacao = {
            to: dados.to,
            data: encodedABI,
            from: dados.from,
            gas: 3000000,
            gasPrice: '0'
        };

        const rawTx = await this.assinarTransacao(objetoTransacao, privateKey, this.web3);

        const transaction = await this.web3.eth.sendSignedTransaction(rawTx);
        return {
            sucesso: true,
            mensagem: 'Licitacao finalizada com sucesso',
            hashTransacao: transaction.transactionHash.toString()
        };
    }

    async iniciarCandidatura(dados: CreateNewTransactionDTO, privateKey: string): Promise<TransactionResultDTO> {
        const contrato = new this.web3.eth.Contract(this.abi, dados.to);
        const encodedABI = contrato.methods.iniciarCandidatura().encodeABI();

        const objetoTransacao = {
            to: dados.to,
            data: encodedABI,
            from: dados.from,
            gas: 3000000,
            gasPrice: '0'
        };

        const rawTx = await this.assinarTransacao(objetoTransacao, privateKey, this.web3);
        const transaction = await this.web3.eth.sendSignedTransaction(rawTx);
        return {
            sucesso: true,
            mensagem: 'Candidatura iniciada com sucesso',
            hashTransacao: transaction.transactionHash.toString()
        };
    }
}