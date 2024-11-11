import licitacao_concorrencia_selecao_menor_preco_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import container from '../../../di/container';
import { Web3Provider } from '../../../app/providers/web3_provider';
import DetalhesLicitacaoOutputDto from '../../dtos/detalhes_licitacao_output_dto';
import LicitacaoDataRawOutputDto from '../../dtos/licitacao_data_raw_output_dto';

export default async function detalhesLicitacao(enderecoContrato: string) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        licitacao_concorrencia_selecao_menor_preco_abi,
        enderecoContrato
    );

    const licitacaoData: LicitacaoDataRawOutputDto = await contrato.methods
        .licitacao()
        .call();

    return new DetalhesLicitacaoOutputDto(licitacaoData, enderecoContrato);
}
