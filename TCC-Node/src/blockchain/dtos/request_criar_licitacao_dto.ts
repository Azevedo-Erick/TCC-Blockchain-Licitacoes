export default interface RequestCriarLicitacaoDto {
    from: string;
    titulo: string;
    descricao: string;
    hashETP: string;
    hashEdital: string;
    dataInicio: number;
    dataInicioCandidaturas: number;
    dataFimCandidaturas: number;
}
