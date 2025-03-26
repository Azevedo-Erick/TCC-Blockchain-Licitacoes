import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnauthorizedException extends Exception {
  static status = 401
  static code = 'UNAUTHORIZED'
  static message = 'Usuário não autenticado'

  constructor() {
    super(UnauthorizedException.message)
  }

  handle(error: this, { response }: HttpContext) {
    response.status(error.status).send({
      code: error.code,
      message: error.message
    })
  }
}