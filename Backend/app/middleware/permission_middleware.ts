import PermissionDenied from '#exceptions/permission_denied_exception'
import Unauthorized from '#exceptions/unauthorized_exception'
import type { HttpContext } from '@adonisjs/core/http'

export default class PermissionMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>, guards: string[]) {
    const { auth, response } = ctx
    if (guards.length === 0) {
      return await next()
    }

    let user = auth.user

    if (!user) {
      throw new Unauthorized()
    }

    await user.load('role', (query) => {
      query.preload('permissions')
    })
    //TODO: Adicionar verificação de permissão para cada guard 
    let hasPermission = await user.hasPermission(guards[0]);

    if (!hasPermission) {
      throw new PermissionDenied()
    }
    await next()
  }
}