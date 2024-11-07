import { Web3Provider } from '../../../app/providers/web3_provider';
import container from '../../../di/container';

export default function criarConta() {
    const web3 = container.get(Web3Provider).getWeb3();
    const account = web3.eth.accounts.create();
    console.log('Endereço da conta:', account.address);
    console.log('Chave privada:', account.privateKey);
}
