import LicitacaoDataRawOutputDto from './licitacao_data_raw_output_dto';

export default class DetalhesLicitacaoOutputDto {
    titulo: string;
    descricao: string;
    hashETP: string;
    hashEdital: string;
    dataInicio: Date;
    dataInicioCandidaturas: Date;
    dataFimCandidaturas: Date;
    estagio: number;
    enderecoBloco: string;

    constructor(data: LicitacaoDataRawOutputDto, enderecoBloco: string) {
        this.titulo = data.titulo || data['0'];
        this.descricao = data.descricao || data['1'];
        this.hashETP = data.hashETP || data['2'];
        this.hashEdital = data.hashEdital || data['3'];
        this.dataInicio = new Date(Number(data.dataInicio || data['4']) * 1000);
        this.dataInicioCandidaturas = new Date(
            Number(data.dataInicioCandidaturas || data['5']) * 1000
        );
        this.dataFimCandidaturas = new Date(
            Number(data.dataFimCandidaturas || data['6']) * 1000
        );
        this.estagio = Number(data.estagio || data['7']);
        this.enderecoBloco = enderecoBloco;
    }
}
