export default interface CreateLicitacaoParamsDto {
    titulo: string,
    descricao: string,
    hashEtp: string,
    hashEdital:
    string, dataInicio: Date,
    dataInicioCandidaturas: Date,
    dataFimCandidaturas: Date,
    userId: string
}