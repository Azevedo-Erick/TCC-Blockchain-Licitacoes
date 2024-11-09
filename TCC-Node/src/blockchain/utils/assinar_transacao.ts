import { Web3Provider } from '../../app/providers/web3_provider';
import container from '../../di/container';

const assinarTransacao = async (objetoTransacao: any, chavePrivada: string) => {
    const web3 = container.get(Web3Provider).getWeb3();

    const data = await web3.eth.accounts.signTransaction(
        objetoTransacao,
        chavePrivada
    );
    const rawTx = data.rawTransaction;
    return rawTx;
};

export default assinarTransacao;
