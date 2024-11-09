export default interface AdicionarLicitacaoDTO {
    enderecoRemetente: string;
    chaveRemetente: string;
    tituloLicitacao: string;
    descricaoLicitacao: string;
    dataInicio: number;
    dataInicioCandidaturas: number;
    dataFimCandidaturas: number;
    etpHash: string;
    editalHash: string;
}
