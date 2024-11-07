import Web3 from 'web3';
import AdicionarLicitacaoDTO from '../../../app/dtos/adicionar_licitacao_dto';
import { privateKey } from '../../../configs/config';
import container from '../../../di/container';
import web3Instance from '../../../di/container';
import storage_licitacoes_abi from '../../contracts/abis/storage_licitacoes_abi';

const buscarTotalLicitacoes = async (enderecoContrato: string) => {
    const web3 = container.get<Web3>(Web3);

    const contrato = new web3.eth.Contract(
        storage_licitacoes_abi,
        enderecoContrato
    );

    await contrato.methods
        .totalLicitacoes()
        .call()
        .then((resultado) => {
            return resultado;
        })
        .catch((erro) => {
            console.error('Erro ao chamar o contrato:', erro);
        });
};

export default buscarTotalLicitacoes;
