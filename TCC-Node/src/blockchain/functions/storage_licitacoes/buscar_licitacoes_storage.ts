import RespostaBuscaLicitacoesStorageDTO from "../../../app/dtos/resposta_busca_licitacoes_storage_dto";
import { Web3Provider } from "../../../app/providers/web3_provider";
import container from "../../../di/container";
import storage_licitacoes_abi from "../../contracts/abis/storage_licitacoes_abi";

type Licitacao = {
    //fase: string;
    nome: string;
    enderecoBloco: string;
};
export default async function buscarLicitacoesStorage(enderecoContrato: string) {
    const web3 = container.get(Web3Provider).getWeb3();
    const contrato = new web3.eth.Contract(
        storage_licitacoes_abi,
        enderecoContrato
    );

    const response: Licitacao[] = await contrato.methods.buscarLicitacoes().call();

    return response.map((licitacao) => {
        const result: RespostaBuscaLicitacoesStorageDTO = {
            enderecoBloco: licitacao.enderecoBloco,
            nome: licitacao.nome,
            fase: '1' //licitacao.fase
        };
        return result;
    });
}