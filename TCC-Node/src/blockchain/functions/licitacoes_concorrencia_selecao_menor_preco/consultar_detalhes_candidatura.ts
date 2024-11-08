import { Web3Provider } from "../../../app/providers/web3_provider";
import container from "../../../di/container";
import licitacao_concorrencia_selecao_menor_preco_abi from "../../contracts/abis/licitacao_concorrencia_selecao_menor_preco_abi";

interface CandidatoDetalhes {
    endereco: string;
    hashCandidatura: string;
    timestampEnvio: number;
}

export default async function consultarDetalhesCandidatos(contractAddress: string): Promise<CandidatoDetalhes[]> {
    const web3 = container.get(Web3Provider).getWeb3();
    const contrato = new web3.eth.Contract(licitacao_concorrencia_selecao_menor_preco_abi, contractAddress);

    const candidatosList: string[] = await contrato.methods.getCandidatos().call();

    const candidatosDetalhes: CandidatoDetalhes[] = await Promise.all(
        candidatosList.map(async (candidatoAddress) => {
            const candidatoDetalhes = await contrato.methods.candidatos(candidatoAddress).call() as any;

            return {
                endereco: candidatoDetalhes.endereco,
                hashCandidatura: candidatoDetalhes.hashCandidatura,
                timestampEnvio: parseInt(candidatoDetalhes.timestampEnvio, 10),
            };
        })
    );

    return candidatosDetalhes;
}