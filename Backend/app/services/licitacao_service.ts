import Licitacao from "#models/licitacao";
import { inject } from "@adonisjs/core";
import CreateLicitacaoParamsDto from "../dtos/params/create_licitacao_params_dto.js";
import LicitacoesConcorrenciaSelecaoMenorPrecoService from "./blockchain/licitacao_concorrencia_selecao_menor_preco/licitacao_concorrencia_selecao_menor_preco_service.js";
import { UserService } from "./user_service.js";
import { Web3 } from "web3";
import { DateTime } from 'luxon'
import { besuURL } from "#config/app";


@inject()
export class LicitacaoService {


  constructor(private readonly userService: UserService) { }

  public async criarLicitacao(dto: CreateLicitacaoParamsDto): Promise<void> {


    const dataInicioUnix = dto.dataInicio.getTime()
    const dataInicioCandidaturasUnix = dto.dataInicioCandidaturas.getTime()
    const dataFimCandidaturasUnix = dto.dataFimCandidaturas.getTime()


    const user = await this.userService.findWithAccount(parseInt(dto.userId));
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const web3 = new Web3(besuURL);

    const licitacaoConcorrenciaSelecaoMenorPrecoService = new LicitacoesConcorrenciaSelecaoMenorPrecoService(web3);

    const transacao = await licitacaoConcorrenciaSelecaoMenorPrecoService.criarLicitacaoSelecaoMenorPreco({
      titulo: dto.titulo,
      descricao: dto.descricao,
      dataInicio: dataInicioUnix,
      dataInicioCandidaturas: dataInicioCandidaturasUnix,
      dataFimCandidaturas: dataFimCandidaturasUnix,
      chaveRemetente: user.account.privateKeyHash,
      enderecoRemetente: user.account.address,
      hashEdital: dto.hashEdital,
      hashETP: dto.hashEtp,
    });

    if (!transacao) {
      throw new Error('Erro ao criar licitação');
    }

    const licitacao = await Licitacao.create({
      dataFimCandidaturas: DateTime.fromJSDate(dto.dataFimCandidaturas),
      dataInicio: DateTime.fromJSDate(dto.dataInicio),
      dataInicioCandidaturas: DateTime.fromJSDate(dto.dataInicioCandidaturas),
      descricao: dto.descricao,
      estagio: 'registro',
      hashEdital: dto.hashEdital,
      hashContrato: transacao.contractAddress,
      hashEtp: dto.hashEtp,
      titulo: dto.titulo,
    })
  }

  async details(id: any) {
    const web3 = new Web3(new Web3.providers.HttpProvider(besuURL));
    const licitacaoConcorrenciaSelecaoMenorPrecoService = new LicitacoesConcorrenciaSelecaoMenorPrecoService(web3);
    return await licitacaoConcorrenciaSelecaoMenorPrecoService.detalhesLicitacao(id);
  }

  async candidatar(hash: string, userId: string, contractHash: string) {
    const user = await this.userService.findWithAccount(parseInt(userId));
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const web3 = new Web3(besuURL);
    const licitacaoConcorrenciaSelecaoMenorPrecoService = new LicitacoesConcorrenciaSelecaoMenorPrecoService(web3);

    licitacaoConcorrenciaSelecaoMenorPrecoService.enviarCandidatura(
      {
        chavePrivada: user.account.privateKeyHash,
        enderecoContrato: contractHash,
        enderecoRemetente: user.account.address,
        proposta: hash,
      }
    )
  }
}