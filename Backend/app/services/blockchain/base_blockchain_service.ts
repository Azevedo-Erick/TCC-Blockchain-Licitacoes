import { Web3 } from "web3";
import TransactionResultDTO from "../../dtos/result/transaction_result_dto.js";


export default abstract class BaseBlockchainService {

    readonly web3: Web3;

    constructor(web3: Web3) {
        this.web3 = web3;
    }


    protected async signTransaction(objetoTransacao: any, chavePrivada: string) {
        const data = await this.web3.eth.accounts.signTransaction(
            objetoTransacao,
            chavePrivada
        );
        const rawTx = data.rawTransaction;
        return rawTx;
    };
    protected async assinarTransacao(objetoTransacao: any, chavePrivada: string, web3: Web3) {
        const data = await web3.eth.accounts.signTransaction(
            objetoTransacao,
            chavePrivada
        );
        const rawTx = data.rawTransaction;
        return rawTx;
    }

    protected handleError(error: any, mensagemPadrao: string): TransactionResultDTO {
        console.error(mensagemPadrao, error);
        return { sucesso: false, mensagem: `${mensagemPadrao}: ${error.message || 'Erro desconhecido'}` };
    }

    protected async enviarTransacao(
        params: object,
        privateKey: string,
    ): Promise<TransactionResultDTO> {
        try {
            const signedTx = await this.web3.eth.accounts.signTransaction(
                params,
                privateKey
            );
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);

            return { sucesso: true, mensagem: 'Transação enviada com sucesso', hashTransacao: receipt.transactionHash.toString() };
        } catch (error) {
            return this.handleError(error, 'Erro ao enviar transação');
        }
    }
}