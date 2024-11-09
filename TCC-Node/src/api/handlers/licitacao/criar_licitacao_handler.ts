import { plainToClass } from 'class-transformer';
import { CriarLicitacaoRequest } from '../../dtos/CriarLicitacaoRequest';
import { validate } from 'class-validator';
import { NextFunction, Response } from 'express';

import { uploadFile } from '../../../app/providers/ipfs_provider';
import AuthenticatedRequest from '../../auth/authenticated_request';
import container from '../../../di/container';
import { PrismaClientProvider } from '../../../app/providers/prisma_client_provider';
import { LicitacaoConcorrenciaSelecaoMenorPrecoService } from '../../../app/services/licitacao_concorrencia_selecao_menor_preco';

export default async function criarLicitacaoHandler(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    try {
        const dto = plainToClass(CriarLicitacaoRequest, req.body);

        const errors = await validate(dto);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Dados inválidos', errors });
        }

        const userIdJwtPayload = req.payload;
        if (!userIdJwtPayload) {
            return res
                .status(400)
                .json({ message: 'O token não possui userId' });
        }
        const payload = userIdJwtPayload as {
            userId: string;
            iat: number;
            exp: number;
        };

        const prisma = container.get(PrismaClientProvider).getPrisma();

        const user = await prisma.usuario.findUnique({
            where: { id: payload.userId },
            include: {
                conta: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (user.conta === null) {
            return res.status(400).json({
                message:
                    'O usuário não possui uma conta associada, por favor solicite a criação da conta e par de chaves'
            });
        }

        const enderecoRemetente = user.conta.endereco;
        const chaveRemetente = user.conta.chavePrivadaHash; //TODO: ADICIONAR A CRIPTOGRAFIA DE CHAVES

        const {
            tituloLicitacao,
            descricaoLicitacao,
            dataInicio,
            dataInicioCandidaturas,
            dataFimCandidaturas
        } = dto;

        const reqFiles = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const etpFile = reqFiles['etp'] ? reqFiles['etp'][0] : null;
        const editalFile = reqFiles['edital'] ? reqFiles['edital'][0] : null;

        if (!etpFile || !editalFile) {
            return res.status(400).json({
                message: 'Os arquivos ETP e Edital são obrigatórios.'
            });
        }

        const etpNodeFile = new File([etpFile.buffer], etpFile.originalname, {
            type: etpFile.mimetype,
            lastModified: Date.now()
        });

        const editalNodeFileNode = new File(
            [editalFile.buffer],
            editalFile.originalname,
            {
                type: editalFile.mimetype,
                lastModified: Date.now()
            }
        );

        const etpHash = await uploadFile(etpNodeFile);
        if (!etpHash) {
            return res.status(500).json({
                message: 'Erro ao fazer upload do arquivo ETP'
            });
        }
        const editalHash = await uploadFile(editalNodeFileNode);
        if (!editalHash) {
            return res.status(500).json({
                message: 'Erro ao fazer upload do arquivo Edital'
            });
        }
        const licitacaoService = container.get(
            LicitacaoConcorrenciaSelecaoMenorPrecoService
        );

        const dataFimCandidaturasUnix = new Date(dataFimCandidaturas).getTime();
        const dataInicioUnix = new Date(dataInicio).getTime();
        const dataInicioCandidaturasUnix = new Date(
            dataInicioCandidaturas
        ).getTime();

        licitacaoService.adicionarLicitacao({
            dataFimCandidaturas: dataFimCandidaturasUnix,
            dataInicio: dataInicioUnix,
            dataInicioCandidaturas: dataInicioCandidaturasUnix,
            descricaoLicitacao: descricaoLicitacao,
            editalHash: editalHash,
            etpHash: etpHash,
            tituloLicitacao: tituloLicitacao,
            chaveRemetente: chaveRemetente,
            enderecoRemetente: enderecoRemetente
        });

        res.json({
            message: 'Licitação criada com sucesso!',
            licitacao: {
                titulo_licitacao: tituloLicitacao,
                descricao_licitacao: descricaoLicitacao,
                hash_etp: etpHash,
                hash_edital: editalHash,
                data_inicio: dataInicio,
                data_inicio_candidaturas: dataInicioCandidaturas,
                data_fim_candidaturas: dataFimCandidaturas
            }
        });
    } catch (err) {
        return next(err);
    }
}
