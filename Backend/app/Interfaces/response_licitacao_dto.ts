export default class ResponseLicitacaoDto {
    titulo: string = '';;
    descricao: string = '';;
    hashETP: string = '';;
    hashEdital: string = '';;
    dataInicio: Date = new Date();
    dataInicioCandidaturas: Date = new Date();
    dataFimCandidaturas: Date = new Date();
    estagio: string = '';
    enderecoBloco: string = '';
}