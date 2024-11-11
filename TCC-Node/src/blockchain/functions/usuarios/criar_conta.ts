import { Web3Provider } from '../../../app/providers/web3_provider';
import container from '../../../di/container';
import { ResponseCriarContaOutputDto } from '../../dtos/criar_conta_output_dto';

export default function criarConta(): ResponseCriarContaOutputDto {
    const web3 = container.get(Web3Provider).getWeb3();
    const account = web3.eth.accounts.create();
    return {
        address: account.address,
        privateKey: account.privateKey
    };
}
