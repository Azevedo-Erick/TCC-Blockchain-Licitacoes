import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsOptional
} from 'class-validator';

export class CriarLicitacaoRequest {
    @IsString()
    @IsNotEmpty()
    enderecoRemetente: string = ''; // Endereço do remetente

    @IsString()
    @IsNotEmpty()
    tituloLicitacao: string = ''; // Título da licitação

    @IsString()
    @IsNotEmpty()
    descricaoLicitacao: string = ''; // Descrição detalhada

    @IsString()
    @IsNotEmpty()
    hashETP: string = ''; // Hash do ETP

    @IsString()
    @IsNotEmpty()
    hashEdital: string = ''; // Hash do Edital

    @IsDateString()
    @IsNotEmpty()
    dataInicio: string = ''; // Data de início

    @IsDateString()
    @IsNotEmpty()
    dataInicioCandidaturas: string = ''; // Data de início das candidaturas

    @IsDateString()
    @IsNotEmpty()
    dataFimCandidaturas: string = ''; // Data de fim das candidaturas

    @IsOptional()
    etpFile?: Express.Multer.File; // Arquivo ETP (opcional, mas se enviado, precisa ser validado)

    @IsOptional()
    editalFile?: Express.Multer.File; // Arquivo Edital (opcional, mas se enviado, precisa ser validado)
}
