export default interface AdicionarLicitacaoDTO {
    enderecoRemetente: string;
    tituloLicitacao: string;
    descricaoLicitacao: string;
    dataInicio: number;
    dataInicioCandidaturas: number;
    dataFimCandidaturas: number;
    etp: string;
    edital: string;
}
