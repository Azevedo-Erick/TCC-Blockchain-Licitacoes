import Web3 from 'web3';
import { privateKey } from '../../../configs/config';
import container from '../../../di/container';
import web3Instance from '../../../di/container';
import CriarNovaTransacaoDto from '../../../dtos/CriarNovaTransacaoDto';
import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import assinarTransacao from '../../utils/assinar_transacao';
import { Web3Provider } from '../../../app/providers/web3_provider';

export default async function atualizarEstado(
    from: string,
    contractAdrres: string
) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(leilao_abi, contractAdrres);
    const encodedABI = contrato.methods.atualizarEstado().encodeABI();

    const objetoTransacao = {
        to: contractAdrres,
        data: encodedABI,
        from: from,
        gas: 3000000,
        gasPrice: '0'
    };

    const rawTx = await assinarTransacao(objetoTransacao, privateKey);
    const transaction = await web3.eth.sendSignedTransaction(rawTx);
    return transaction;
}
