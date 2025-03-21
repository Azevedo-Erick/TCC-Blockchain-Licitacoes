import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PermissionMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, guards: string[]) {
    const [permissionName] = guards

    const user = auth.user

    if (!user) {
      return response.unauthorized({ error: 'Usuário não autenticado' })
    }

    const hasPermission = await user.hasPermission(permissionName)

    if (!hasPermission) {
      return response.forbidden({ error: 'Permissão negada' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}