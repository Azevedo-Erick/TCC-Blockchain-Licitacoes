import licitacao_concorrencia_selecao_menor_preco_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import container from '../../../di/container';
import { Web3Provider } from '../../../app/providers/web3_provider';
import ResponseDetalhesLicitacaoDto from '../../dtos/response_detalhes_licitacao_dto';
import LicitacaoData from '../../dtos/licitacao_data';

export default async function detalhesLicitacao(enderecoContrato: string) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        licitacao_concorrencia_selecao_menor_preco_abi,
        enderecoContrato
    );

    const licitacaoData: LicitacaoData = await contrato.methods
        .licitacao()
        .call();

    return new ResponseDetalhesLicitacaoDto(licitacaoData, enderecoContrato);
}
