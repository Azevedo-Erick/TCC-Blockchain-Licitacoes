import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi.js';
import container from '../../../di/container.js';
import Web3 from 'web3';
import RequestCriarLicitacaoDto from '../../dtos/request_criar_licitacao_dto.js';
import deployLicitacaoSelecaoMenorPrecoContract from './deploy_licitacao_selecao_menor_preco_contract.js';
import { Web3Provider } from '../../../app/providers/web3_provider.js';

export default async function criarLicitacaoSelecaoMenorPreco(
    dto: RequestCriarLicitacaoDto
) {
    const web3 = container.get<Web3Provider>(Web3Provider).getWeb3();

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

    const transaction = await deployLicitacaoSelecaoMenorPrecoContract(
        from,
        chaveRemetente
    );

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

    const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        chaveRemetente
    );

    const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
    );
    return {
        contractAddress: contratoInstanciado.options.address,
        blockHash: receipt.blockHash
    };
}
