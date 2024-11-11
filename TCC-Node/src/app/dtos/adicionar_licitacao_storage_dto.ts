export default interface AdicionarLicitacaoStorageDTO {
    enderecoRemetente: string;
    privateKey: string;
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
