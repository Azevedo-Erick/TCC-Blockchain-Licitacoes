import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi.js';
import licitacaoConcorrenciaSelecaoMenorPrecoBytecode from '../../contracts/bytecodes/licitacao_concorrencia_selecao_menor_preco_bytecode.js';
import assinarTransacao from '../../utils/assinar_transacao.js';
import { privateKey } from '../../../configs/config.js';
import container from '../../../di/container.js';
import Web3 from 'web3';
import { Web3Provider } from '../../../app/providers/web3_provider.js';
import RequestCriarLicitacaoDto from '../../dtos/request_criar_licitacao_dto.js';

export default async function createAuction(dto: RequestCriarLicitacaoDto) {
    const web3 = container.get<Web3>(Web3);

    const {
        from,
        titulo,
        descricao,
        hashETP,
        hashEdital,
        dataInicio,
        dataInicioCandidaturas,
        dataFimCandidaturas
    } = dto;

    const transaction = await deployAuctionContract(from);

    if (!transaction) {
        return;
    }

    const enderecoContrato = transaction.contractAddress;

    const contratoInstanciado = new web3.eth.Contract(
        leilao_abi,
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
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
        from: from,
        to: contratoInstanciado.options.address,
        data: encodedABI,
        gasPrice: gasPrice,
        gas: 2000000
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
    );
    return receipt.blockHash;
}

const deployAuctionContract = async (from: string) => {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(leilao_abi);
    const deploy = contrato
        .deploy({
            data: licitacaoConcorrenciaSelecaoMenorPrecoBytecode,
            arguments: []
        })
        .encodeABI();

    const objetoTransacao = {
        data: deploy,
        from: from,
        gas: 2273364,
        gasPrice: 0
    };

    const rawTx = await assinarTransacao(objetoTransacao, privateKey);
    return await web3.eth.sendSignedTransaction(rawTx);
};
