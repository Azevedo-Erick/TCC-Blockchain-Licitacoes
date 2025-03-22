import User from "#models/user";
import { Exception } from "@adonisjs/core/exceptions";
import { Authenticator } from "@adonisjs/auth";
import { Authenticators } from "@adonisjs/auth/types";
import DB from '@adonisjs/lucid/services/db'
import BaseApiResponseDTO from "../dtos/response/base_api_response_dto.js";
import db from '@adonisjs/lucid/services/db'
import { UserService } from "./user_service.js";
import { inject } from "@adonisjs/core";

@inject()
export class AuthService {
  constructor(private userService: UserService) { }
  public async register(data: { fullName: string; email: string; password: string }) {
    const dbTransaction = await db.transaction()
    try {
      const user = new User();
      user.fullName = data.fullName
      user.email = data.email
      user.password = data.password
      user.useTransaction(dbTransaction)
      await user.save()
      const account = await this.userService.createAccount(user.id.toString(), dbTransaction)
      await user.related('account').save(account)

      await dbTransaction.commit()
      return user
    } catch (error) {
      if (error.code == 23505) {
        throw new Exception("E-mail e/ou senha invalidos", { code: 'E_UNIQUE', status: 400 })
      }
      await dbTransaction.rollback()
    }
  }

  public async login(email: string, password: string) {
    try {
      const user = await User.verifyCredentials(email, password).catch(() => {
        throw new Exception('Credenciais inválidas', { code: 'E_INVALID_AUTH', status: 401 })
      })
      const token = await User.accessTokens.create(user, [], {
        expiresIn: '1h',
        name: 'auth',
      });
      return BaseApiResponseDTO.success(token)
    } catch (error) {
      throw new Exception('Credenciais inválidas', { code: 'E_INVALID_AUTH', status: 401 })
    }
  }

  public async logout(auth: Authenticator<Authenticators>) {
    const getUser = auth.user?.id
    const user = await User.findOrFail(getUser)
    if (!user) {
      throw new Exception('Usuário não autenticado', { code: 'E_UNAUTHORIZED', status: 401 })
    }
    await User.accessTokens.delete(user, user.id)
    await DB.from('auth_access_tokens').where('tokenable_id', user.id).delete()
    return BaseApiResponseDTO.success({ message: 'Usuário deslogado com sucesso' })
  }
}