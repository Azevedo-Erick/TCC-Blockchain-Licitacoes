import assinarTransacao from '../../utils/assinar_transacao.js';
import storage_licitacoes_abi from '../../contracts/abis/storage_licitacoes_abi.js';
import storage_licitacoes_bytecode from '../../contracts/bytecodes/storage_licitacoes_bytecode.js';
import container from '../../../di/container.js';
import { Web3Provider } from '../../../app/providers/web3_provider.js';

export default async function criarStorageLicitacoes(
    from: string,
    privateKey: string
) {
    const web3 = container.get<Web3Provider>(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(storage_licitacoes_abi);
    const deploy = contrato.deploy({
        data: storage_licitacoes_bytecode,
        arguments: []
    });
    const estimatedGas = await deploy.estimateGas();
    const encodedAbi = deploy.encodeABI();

    const gasPrice = await web3.eth.getGasPrice();

    const objetoTransacao = {
        from: from,
        data: encodedAbi,
        gas: estimatedGas,
        gasPrice: gasPrice
    };

    const signedTransaction = await assinarTransacao(
        objetoTransacao,
        privateKey
    );
    const retorno = await web3.eth.sendSignedTransaction(signedTransaction);
    return retorno.contractAddress;
}
