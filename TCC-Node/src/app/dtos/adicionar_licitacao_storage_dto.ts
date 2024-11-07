export default interface AdicionarLicitacaoStorageDTO {
    enderecoRemetente: string;
    enderecoLicitacao: string;
    tituloLicitacao: string;
    descricaoLicitacao: string;
    dataInicio: number;
    dataInicioCandidaturas: number;
    dataFimCandidaturas: number;
    etp: string;
    edital: string;
    estagio: string;
}
