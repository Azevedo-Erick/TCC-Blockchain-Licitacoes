import Permission from '#models/permission';
import Role from '#models/role';
import { addPermissionToRoleValidation, createRoleValidation, editRoleValidation, removePermissionFromRoleValidation } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {

  async index({ response }: HttpContext) {
    const roles = await Role.query().preload('permissions');
    return response.ok(roles);
  }

  async store({ request, response }: HttpContext) {
    try {

      const data = await request.validateUsing(createRoleValidation);
      const role = new Role();
      role.name = data.name;
      await role.save();
      if (data.permissions) {
        const permissions = await Permission.query().whereIn('id', data.permissions).exec();
        await role.related('permissions').sync(permissions.map(p => p.id));
      }
      return response.ok(role);
    } catch (e) {
      if (e.status === 422) {
        return response.unprocessableEntity(e.messages);
      }
    }
  }

  async show({ params, response }: HttpContext) {
    const role = await Role.query().where('id', params.id).preload('permissions').firstOrFail();
    return response.ok(role);
  }

  async update({ params, response, request }: HttpContext) {
    const data = await request.validateUsing(editRoleValidation);
    const role = await Role.query().where('id', params.id).firstOrFail();
    role.name = data.name;
    await role.save();
    if (data.permissions) {
      const permissions = await Permission.query().whereIn('id', data.permissions).exec();
      await role.related('permissions').sync(permissions.map(p => p.id));
    }
    return response.ok(role);
  }

  async destroy({ params, response }: HttpContext) {
    const role = await Role.query().where('id', params.id).firstOrFail();
    await role.delete();
    return response.ok(role);
  }

  async addPermission({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(addPermissionToRoleValidation);
    const role = await Role.query().where('id', params.id).firstOrFail();
    const permission = await Permission.query().where('id', data.permission_id).firstOrFail();
    await role.related('permissions').attach([permission.id]);
    return response.ok(role);
  }

  async removePermission({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(removePermissionFromRoleValidation);
    const role = await Role.query().where('id', params.id).firstOrFail();
    const permission = await Permission.query().where('id', data.permission_id).firstOrFail();
    await role.related('permissions').detach([permission.id]);
    return response.ok(role);
  }

  async clearPermissions({ params, response }: HttpContext) {
    try {

      const role = await Role.query().where('id', params.id).firstOrFail();
      await role.related('permissions').detach();
      return response.ok(role);
    } catch (e) {
      console.log(e);
    }
  }
}