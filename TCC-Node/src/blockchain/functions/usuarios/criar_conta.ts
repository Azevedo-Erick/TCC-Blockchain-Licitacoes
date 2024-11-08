import { Web3Provider } from '../../../app/providers/web3_provider';
import container from '../../../di/container';
import { ResponseCriarContaDto } from '../../dtos/response_criar_conta_dto';

export default function criarConta(): ResponseCriarContaDto {
    const web3 = container.get(Web3Provider).getWeb3();
    const account = web3.eth.accounts.create();
    return {
        address: account.address,
        privateKey: account.privateKey
    };
}
