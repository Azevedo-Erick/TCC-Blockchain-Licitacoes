import { Web3 } from 'web3';
import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi.js';
import container from '../../../di/container.js';
import { Web3Provider } from '../../../app/providers/web3_provider.js';

const consultarCandidatos = async () => {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        leilao_abi,
        '0x5DD2Cb03a6A12EC00F639dced496106F27401738'
    );
    const candidatosList = await contrato.methods.getCandidatos().call();
    console.log('Candidatos:', candidatosList);
    return candidatosList;
};

export default consultarCandidatos;
