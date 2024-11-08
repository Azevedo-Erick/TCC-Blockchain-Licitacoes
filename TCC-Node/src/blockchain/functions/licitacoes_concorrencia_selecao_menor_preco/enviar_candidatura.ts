import leilao_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import assinarTransacao from '../../utils/assinar_transacao';
import CriarNovaTransacaoDto from '../../../dtos/CriarNovaTransacaoDto';
import { privateKey } from '../../../configs/config';
import container from '../../../di/container.js';
import { Web3Provider } from '../../../app/providers/web3_provider';
import RealizarCandidaturaDTO from '../../../app/dtos/realizar_candidatura_dto';

export default async function enviarCandidatura(
    dto: RealizarCandidaturaDTO
) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(leilao_abi, dto.enderecoContrato);
    const encodedABI = contrato.methods
        .enviarCandidatura(dto.proposta)
        .encodeABI();

    const objetoTransacao = {
        to: dto.enderecoContrato,
        data: encodedABI,
        from: dto.enderecoRemetente,
        gas: 3000000,
        gasPrice: '0'
    };

    const rawTx = await assinarTransacao(objetoTransacao, dto.chavePrivada);
    const transaction = await web3.eth.sendSignedTransaction(rawTx);
    return transaction;
}
