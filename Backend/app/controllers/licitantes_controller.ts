import RamoAtividade from '#models/ramo_atividade';
import LicitanteService from '#services/licitante_service';
import { createLicitanteValidator } from '#validators/licitante';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import CreateLicitanteDto from '../dtos/params/create_licitante_dto.js';
import Licitante from '#models/licitante';

@inject()
export default class LicitantesController {

  constructor(private licitanteService: LicitanteService) { }
  async index({ }: HttpContext) {
    const licitantes = await Licitante.query().preload('ramoAtividade');
    return licitantes;
  }

  async store({ request, auth }: HttpContext) {
    const data = await request.validateUsing(createLicitanteValidator);
    const user = auth.user;
    if (!user) {
      return { error: 'Usuário não encontrado' };
    }
    const dto: CreateLicitanteDto = {
      userId: user.id,
      cnpj: data.cnpj,
      nomeFantasia: data.nomeFantasia,
      razaoSocial: data.razaoSocial,
      ramoAtividadeId: data.ramoAtividadeId
    };
    return await this.licitanteService.create(dto);

  }

  async show({ params }: HttpContext) {
    const licitante = await Licitante.query().where('id', params.id).preload('ramoAtividade').first();
    if (!licitante) {
      return { error: 'Licitante não encontrado' };
    }
    return licitante;
  }

  /*   async update({ params, request }: HttpContext) { }
    async destroy({ params }: HttpContext) { } */
}