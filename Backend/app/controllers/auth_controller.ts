// import type { HttpContext } from '@adonisjs/core/http'

import { AuthService } from "#services/auth_service"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"

@inject()
export default class AuthController {
    constructor(private authService: AuthService) { }

    /**
   * @register
   * @operationId Realiza o cadastro de um usuario
   * @description Retorna um token de autenticação para o usuário
   * @responseBody 200 - <Product[]>.with(relations)
   * @requestBody {"fullname": "Teste","email": "test@email.com", "password": "123"}
   * @responseBody 200 - {"token": "xxxxxxx"}
   */
    public async register({ request, response }: HttpContext) {
        const data = request.only(['fullName', 'email', 'password'])

        try {
            const user = await this.authService.register(data)
            return response.created({ message: 'Usuário registrado com sucesso', user })
        } catch (error) {
            console.log(error)
            return response.badRequest({ message: 'Erro ao registrar usuário', error })
        }
    }

    /**
   * @login
   * @operationId Realiza login de usuário
   * @description Retorna um token de autenticação para o usuário
   * @responseBody 200 - <Product[]>.with(relations)
   * @requestBody {"email": "test@email.com", "password": "123"}
   * @responseBody 200 - {"token": "xxxxxxx"}
   */
    public async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])

        try {
            const result = await this.authService.login(email, password)
            return response.ok(result)
        } catch (error) {
            return response.unauthorized({ message: error.message })
        }
    }

    public async logout(ctx: HttpContext) {
        try {
            return await this.authService.logout(ctx.auth)
        } catch (error) {
            return { message: error.message }
        }
    }
}