import { Web3Provider } from '../../../app/providers/web3_provider';
import container from '../../../di/container';
import licitacao_concorrencia_selecao_menor_preco_abi from '../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi';
import licitacao_concorrencia_selecao_menor_preco_bytecode from '../../contracts/bytecodes/licitacao_concorrencia_selecao_menor_preco_bytecode';
import assinarTransacao from '../../utils/assinar_transacao';

export default async function deployLicitacaoSelecaoMenorPrecoContract(
    enderecoRemetente: string,
    chavePrivada: string
) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        licitacao_concorrencia_selecao_menor_preco_abi
    );
    const deploy = contrato
        .deploy({
            data: licitacao_concorrencia_selecao_menor_preco_bytecode,
            arguments: []
        })
        .encodeABI();

    const objetoTransacao = {
        data: deploy,
        from: enderecoRemetente,
        gas: 2273364,
        gasPrice: 0
    };

    const rawTx = await assinarTransacao(objetoTransacao, chavePrivada);
    return await web3.eth.sendSignedTransaction(rawTx);
}
