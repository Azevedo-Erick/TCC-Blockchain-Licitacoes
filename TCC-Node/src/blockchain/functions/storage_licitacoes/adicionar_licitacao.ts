import { privateKey } from '../../../configs/config';
import container from '../../../di/container';
import storage_licitacoes_abi from '../../contracts/abis/storage_licitacoes_abi';
import { Web3Provider } from '../../../app/providers/web3_provider';
import AdicionarLicitacaoStorageDTO from '../../../app/dtos/adicionar_licitacao_storage_dto';

export default async function adicionarLicitacao(
    enderecoContrato: string,
    licitacao: AdicionarLicitacaoStorageDTO
) {
    const web3 = container.get(Web3Provider).getWeb3();

    const contrato = new web3.eth.Contract(
        storage_licitacoes_abi,
        enderecoContrato
    );

    const {
        enderecoRemetente,
        tituloLicitacao,
        descricaoLicitacao,
        dataInicio,
        dataInicioCandidaturas,
        dataFimCandidaturas,
        etp,
        edital,
        estagio
    } = licitacao;

    const encodedABI = contrato.methods
        .adicionarLicitacao(
            enderecoRemetente,
            tituloLicitacao,
            descricaoLicitacao,
            dataInicio,
            dataInicioCandidaturas,
            dataFimCandidaturas,
            etp,
            edital,
            estagio
        )
        .encodeABI();

    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
        from: enderecoContrato,
        to: contrato.options.address,
        data: encodedABI,
        gasPrice: gasPrice,
        gas: 2000000
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}
