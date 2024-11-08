import Web3 from 'web3';
import container from '../../../di/container';;
import storage_licitacoes_abi from '../../contracts/abis/storage_licitacoes_abi';

export default async function buscarTotalLicitacoes(enderecoContrato: string) {
    const web3 = container.get<Web3>(Web3);

    const contrato = new web3.eth.Contract(
        storage_licitacoes_abi,
        enderecoContrato
    );

    return await contrato.methods
        .totalLicitacoes()
        .call();
};
