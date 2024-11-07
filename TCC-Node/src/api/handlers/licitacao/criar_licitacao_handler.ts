import { plainToClass } from 'class-transformer';
import { CriarLicitacaoRequest } from '../../dtos/CriarLicitacaoRequest';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { uploadFile } from '../../../app/providers/ipfs_provider';

const criarLicitacaoHandler = async (req: any, res: Response) => {
    const dto = plainToClass(CriarLicitacaoRequest, req.body);

    const errors = await validate(dto);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Dados inválidos', errors });
    }

    const {
        enderecoRemetente,
        tituloLicitacao,
        descricaoLicitacao,
        dataInicio,
        dataInicioCandidaturas,
        dataFimCandidaturas
    } = dto;

    const etpFile = req.files['etp'] ? req.files['etp'][0] : null;
    const editalFile = req.files['edital'] ? req.files['edital'][0] : null;

    if (!etpFile || !editalFile) {
        return res
            .status(400)
            .json({ message: 'Os arquivos ETP e Edital são obrigatórios.' });
    }

    const etpHash = uploadFile(etpFile);
    const editalHash = uploadFile(editalFile);

    return res.status(200).json({
        message: 'Licitação criada com sucesso!',
        licitacao: {
            enderecoRemetente,
            tituloLicitacao,
            descricaoLicitacao,
            etpHash,
            editalHash,
            dataInicio,
            dataInicioCandidaturas,
            dataFimCandidaturas,
            etpFilePath: etpFile.path,
            editalFilePath: editalFile.path
        }
    });
};

export default criarLicitacaoHandler;
