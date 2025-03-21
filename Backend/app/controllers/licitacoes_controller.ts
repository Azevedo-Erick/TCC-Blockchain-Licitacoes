// import type { HttpContext } from '@adonisjs/core/http'

import { IpfsService } from "#services/ipfs_service"
import { LicitacaoService } from "#services/licitacao_service"
import { UserService } from "#services/user_service"
import { createLicitacaoValidator } from "#validators/licitacao"
import UserHasBlockchainAccess from "#validators/validations/rules/user_has_blockchain_access"
import Validator from "#validators/validations/validator"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import app from '@adonisjs/core/services/app'
import fs from 'fs/promises'

@inject()
export default class LicitacoesController {
    constructor(private ipfsService: IpfsService, private licitacaoService: LicitacaoService, private userService: UserService) { }
    public async criar({ request, auth, response }: HttpContext) {
        try {
            const user = auth.user
            if (!user) {
                return response.unauthorized({ message: 'Usuário não autenticado' })
            }

            const data = request.all()
            const payload = await createLicitacaoValidator.validate(data)

            const usuario = await this.userService.findWithAccount(user.id)
            let validacao = Validator.validate(UserHasBlockchainAccess, usuario)
            if (!validacao.isValid) {
                return response.badRequest({ message: validacao.message })
            }

            const { tituloLicitacao, descricaoLicitacao, dataInicio, dataInicioCandidaturas, dataFimCandidaturas } = payload

            const etpFile = request.file('etp')
            const editalFile = request.file('edital')

            if (!etpFile || !editalFile) {
                return response.badRequest({ message: 'Os arquivos ETP e Edital são obrigatórios.' })
            }

            await etpFile.move(app.tmpPath('uploads'))
            await editalFile.move(app.tmpPath('uploads'))

            const etpFileBuffer = await fs.readFile(etpFile.tmpPath!)
            const etpNodeFile = new File([etpFileBuffer], etpFile.clientName, {
                type: etpFile.headers['content-type'] || 'application/octet-stream',
                lastModified: Date.now(),
            })

            const editalFileBuffer = await fs.readFile(editalFile.tmpPath!)
            const editalNodeFile = new File([editalFileBuffer], etpFile.clientName, {
                type: etpFile.headers['content-type'] || 'application/octet-stream',
                lastModified: Date.now(),
            })
            const etpHash = await this.ipfsService.uploadFile(etpNodeFile)
            const editalHash = await this.ipfsService.uploadFile(editalNodeFile)

            if (!etpHash || !editalHash) {
                return response.internalServerError({ message: 'Erro ao fazer upload dos arquivos para IPFS' })
            }

            await this.licitacaoService.criarLicitacao({
                dataFimCandidaturas: dataInicioCandidaturas,
                dataInicio: dataInicio,
                dataInicioCandidaturas: dataFimCandidaturas,
                descricao: descricaoLicitacao,
                hashEdital: editalHash,
                hashEtp: etpHash,
                titulo: tituloLicitacao,
                userId: usuario!.id.toString(),
            })

            return response.ok({
                message: 'Licitação criada com sucesso!',
                licitacao: {
                    titulo_licitacao: tituloLicitacao,
                    descricao_licitacao: descricaoLicitacao,
                    hash_etp: etpHash,
                    hash_edital: editalHash,
                    data_inicio: dataInicio,
                    data_inicio_candidaturas: dataInicioCandidaturas,
                    data_fim_candidaturas: dataFimCandidaturas,
                },
            })
        } catch (error) {
            return response.internalServerError({ message: 'Erro ao criar licitação', error: error.message })
        }
    }

    /**
   * @show
   * @summary Obtém detalhes de uma licitação
   * @description Retorna as informações detalhadas de uma licitação com base no ID fornecido
   * @param id - Identificador da licitação a ser buscada
   * @responseBody 200 - {"titulo": "****", "descricao": "****", "hashETP": "****", "hashEdital": "****", "dataInicio": "2025-03-20T01:38:18.000Z", "dataInicioCandidaturas": "2025-03-20T01:39:18.000Z", "dataFimCandidaturas": "2025-03-20T01:50:18.000Z", "estagio": "**", "enderecoBloco": "****"}
   * @responseBody 500 - {"message": "Erro ao buscar licitação", "error": "****"}
   */
    public async show({ params, response }: HttpContext) {
        try {
            return response.ok(await this.licitacaoService.details(params.id))
        } catch (error) {
            return response.internalServerError({ message: 'Erro ao buscar licitação', error: error.message })
        }
    }

    public async candidatar({ request, params, auth, response }: HttpContext) {
        try {
            const user = auth.user
            let validacao = Validator.validate(UserHasBlockchainAccess, user)
            if (!validacao.isValid) {
                return response.badRequest({ message: validacao.message })
            }

            const usuario = await this.userService.findWithAccount(user!.id)
            const file = request.file('proposta')
            if (!file) {
                return response.badRequest({ message: 'O arquivo da proposta é obrigatório.' })
            }

            await file.move(app.tmpPath('uploads'))

            const fileBuffer = await fs.readFile(file.tmpPath!)

            const nodeFile = new File([fileBuffer], file.clientName, {
                type: file.headers['content-type'] || 'application/octet-stream',
                lastModified: Date.now(),
            })

            const hash = await this.ipfsService.uploadFile(nodeFile)

            if (!hash) {
                return response.internalServerError({ message: 'Erro ao fazer upload da proposta' })
            }

            await this.licitacaoService.candidatar(hash, usuario!.id.toString(), params.id)

            return response.ok({ message: 'Candidatura realizada com sucesso!' })
        } catch (error) {
        }
    }
}
