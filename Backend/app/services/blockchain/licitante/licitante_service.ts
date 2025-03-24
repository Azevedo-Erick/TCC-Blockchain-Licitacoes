import { Web3 } from "web3";
import licitante_utils from "./licitante_utils.js";
import BaseBlockchainService from "../base_blockchain_service.js";
import BlockCreationResultDTO from "../../../dtos/result/block_creation_result_dto.js";
export default class BlockchainLicitanteService extends BaseBlockchainService {

    private readonly abi = licitante_utils.abi;
    private readonly bytecode = licitante_utils.bytecode;
    constructor(web3: Web3) {
        super(web3);
    }

    public async deploy(
        enderecoRemetente: string,
        chavePrivada: string,
        nomeFantasia: string,
        razaoSocial: string,
        cnpj: string,
        ramoAtividadeId: number,
    ): Promise<BlockCreationResultDTO> {
        const contrato = new this.web3.eth.Contract(
            this.abi
        );
        console.log("Deploying contract with arguments:", {
            enderecoRemetente,
            nomeFantasia,
            razaoSocial,
            cnpj,
            ramoAtividadeId
        });
        if (typeof nomeFantasia !== 'string' || typeof razaoSocial !== 'string' || typeof cnpj !== 'string') {
            throw new Error('Invalid string argument(s)');
        }

        if (!Number.isInteger(ramoAtividadeId) || ramoAtividadeId < 0) {
            throw new Error('Invalid ramoAtividadeId');
        }

        const deploy = contrato
            .deploy({
                data: this.bytecode,
                arguments: [
                    nomeFantasia,
                    razaoSocial,
                    cnpj,
                    ramoAtividadeId
                ]
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
}