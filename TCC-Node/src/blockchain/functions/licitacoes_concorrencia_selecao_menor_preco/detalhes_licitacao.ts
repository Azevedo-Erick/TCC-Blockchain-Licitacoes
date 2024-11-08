import licitacao_concorrencia_selecao_menor_preco_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import container from '../../../di/container';
import { Web3Provider } from '../../../app/providers/web3_provider';

export default async function detalhesLicitacao(endereco: string) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        licitacao_concorrencia_selecao_menor_preco_abi,
        endereco
    );

    return await contrato.methods
        .licitacao()
        .call();
}
