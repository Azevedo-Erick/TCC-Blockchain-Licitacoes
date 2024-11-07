import { Web3 } from 'web3';

import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi.js';
import container from '../../../di/container.js';
import { Web3Provider } from '../../../app/providers/web3_provider.js';

const consultarEstagio = async () => {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        leilao_abi,
        '0x86a67106ceafda28b1908e7f867c0b5ff74c1a01'
    );
    const estagioAtual = await contrato.methods.getEstagio().call();
    console.log('Estágio atual:', estagioAtual);
    return estagioAtual;
};
export default consultarEstagio;
