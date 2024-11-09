export default interface RequestCriarLicitacaoDto {
    enderecoRemetente: string;
    titulo: string;
    chaveRemetente: string;
    descricao: string;
    hashETP: string;
    hashEdital: string;
    dataInicio: number;
    dataInicioCandidaturas: number;
    dataFimCandidaturas: number;
}
