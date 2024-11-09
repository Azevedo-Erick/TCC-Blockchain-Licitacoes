import assinarTransacao from '../../utils/assinar_transacao.js';
import { privateKey } from '../../../configs/config.js';
import storage_licitacoes_abi from '../../contracts/abis/storage_licitacoes_abi.js';
import storage_licitacoes_bytecode from '../../contracts/bytecodes/storage_licitacoes_bytecode.js';
import container from '../../../di/container.js';
import Web3 from 'web3';

export default async function criarStorageLicitacoes(from: string) {
    const web3 = container.get<Web3>(Web3);

    const contrato = new web3.eth.Contract(storage_licitacoes_abi);
    const deploy = contrato
        .deploy({
            data: storage_licitacoes_bytecode,
            arguments: []
        })
        .encodeABI();

    const objetoTransacao = {
        data: deploy,
        from: from,
        gas: 2273364,
        gasPrice: 0
    };

    const rawTx = await assinarTransacao(objetoTransacao, privateKey);
    return await web3.eth.sendSignedTransaction(rawTx);
}
