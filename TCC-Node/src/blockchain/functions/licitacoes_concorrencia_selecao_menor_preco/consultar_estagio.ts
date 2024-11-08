import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi.js';
import container from '../../../di/container.js';
import { Web3Provider } from '../../../app/providers/web3_provider.js';

export default async function consultarEstagio(contractAddress: string) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(leilao_abi, contractAddress);
    const estagioAtual = await contrato.methods.getEstagio().call();
    return estagioAtual;
}
