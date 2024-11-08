import container from '../../../di/container';
import licitacao_concorrencia_selecao_menor_preco_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import { Web3Provider } from '../../../app/providers/web3_provider';

export default async function buscarHistoricoLicitacao(
    from: string,
    enderecoContrato: string
) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contract = new web3.eth.Contract(
        licitacao_concorrencia_selecao_menor_preco_abi,
        enderecoContrato
    );
    return await contract.getPastEvents('allEvents', {
        filter: { from: from },
        fromBlock: 0,
        toBlock: 'latest'
    });
}
