import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class PermissionDeniedException extends Exception {
  static status = 403
  static code = 'PERMISSION_DENIED'
  static message = 'Permissão negada para acessar o recurso'

  constructor() {
    super(PermissionDeniedException.message)
  }

  handle(error: this, { response }: HttpContext) {
    response.status(error.status).send({
      code: error.code,
      message: error.message
    })
  }
}