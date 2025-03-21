import { faker } from '@faker-js/faker';
import CallCriarLicitacaoDto from '../../../app/dtos/params/create_licitacao_dto.js';
import { ResponseCriarContaOutputDto } from '../../../app/dtos/result/create_account_result_dto.js';

export function criarDadosLicitacao(account: ResponseCriarContaOutputDto): CallCriarLicitacaoDto {
    const agora = Math.floor(Date.now() / 1000);
    return {
        titulo: faker.lorem.words(3),
        descricao: faker.lorem.sentence(),
        hashETP: faker.string.alphanumeric(10),
        hashEdital: faker.string.alphanumeric(10),
        dataInicio: agora - faker.number.int({ min: 60, max: 600 }),
        dataInicioCandidaturas: agora - faker.number.int({ min: 30, max: 300 }),
        dataFimCandidaturas: agora + faker.number.int({ min: 600, max: 3600 }),
        enderecoRemetente: account.address,
        chaveRemetente: account.privateKey,
    };
}
