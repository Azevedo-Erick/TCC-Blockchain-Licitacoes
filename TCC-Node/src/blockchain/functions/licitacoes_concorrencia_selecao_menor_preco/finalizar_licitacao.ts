import Web3 from 'web3';
import { privateKey } from '../../../configs/config';
import container from '../../../di/container';
import web3Instance from '../../../di/container';
import CriarNovaTransacaoDto from '../../../dtos/CriarNovaTransacaoDto';
import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import assinarTransacao from '../../utils/assinar_transacao';
import { Web3Provider } from '../../../app/providers/web3_provider';

const finalizarLicitacao = async (dados: CriarNovaTransacaoDto) => {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(leilao_abi, dados.to);
    const encodedABI = contrato.methods.finalizarLicitacao().encodeABI();

    const objetoTransacao = {
        to: dados.to,
        data: encodedABI,
        from: dados.from,
        gas: 3000000,
        gasPrice: '0'
    };

    const rawTx = await assinarTransacao(objetoTransacao, privateKey);

    const transaction = await web3.eth.sendSignedTransaction(rawTx);
    return transaction;
};

export default finalizarLicitacao;
