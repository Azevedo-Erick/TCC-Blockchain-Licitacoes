import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi.js';
import licitacaoConcorrenciaSelecaoMenorPrecoBytecode from '../../contracts/bytecodes/licitacao_concorrencia_selecao_menor_preco_bytecode.js';
import assinarTransacao from '../../utils/assinar_transacao.js';
import web3Instance from '../../../di/container.js';
import { privateKey } from '../../../configs/config.js';
import container from '../../../di/container.js';
import Web3 from 'web3';
import { Web3Provider } from '../../../app/providers/web3_provider.js';

const criarLicitacao = async (
    from: string,
    titulo: string,
    descricao: string,
    hashETP: string,
    hashEdital: string,
    dataInicio: number,
    dataInicioCandidaturas: number,
    dataFimCandidaturas: number
) => {
    const web3 = container.get<Web3>(Web3);

    const transaction = await criarNovarLicitacao(from);
    console.log('Contrato implantado com sucesso:', transaction);

    if (!transaction) {
        console.error('Erro ao implantar o contrato');
        return;
    }

    const enderecoContrato = transaction.contractAddress;
    console.log(
        'Contrato implantado com sucesso no endereço:',
        enderecoContrato
    );

    const contratoInstanciado = new web3.eth.Contract(
        leilao_abi,
        enderecoContrato
    );
    console.log('Criando licitação...');

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
    /* .on('transactionHash', (callback) => {
    console.log(callback);

  })
  .on('receipt', function (receipt) {
    return receipt.blockHash;
  })
  .on('error', function (error) {
    console.error("Erro ao enviar transação:", error);
  }); */
};

const criarNovarLicitacao = async (from: string) => {
    const web3 = container.get(Web3Provider).getWeb3();

    try {
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
        const transaction = await web3.eth.sendSignedTransaction(rawTx);
        console.log('Contrato implantado com sucesso:', transaction);
        return transaction;
    } catch (err) {
        console.error('Erro ao implantar o contrato:', err);
        return null;
    }
};

export default criarLicitacao;
