import CallCriarLicitacaoDto from "../../../app/dtos/params/create_licitacao_dto.js";
import { ResponseCriarContaOutputDto } from "../../../app/dtos/result/create_account_result_dto.js";

export function criarDadosLicitacao(account: ResponseCriarContaOutputDto): CallCriarLicitacaoDto {
    const agora = Math.floor(Date.now() / 1000);
    return {
        titulo: "Teste Licitação",
        descricao: "Descrição da Licitação",
        hashETP: "hashETP123",
        hashEdital: "hashEdital123",
        dataInicio: agora - 120,
        dataInicioCandidaturas: agora - 60,
        dataFimCandidaturas: agora + 600,
        enderecoRemetente: account.address,
        chaveRemetente: account.privateKey,
    };
}