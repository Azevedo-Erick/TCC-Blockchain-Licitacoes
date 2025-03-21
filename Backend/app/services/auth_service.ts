import User from "#models/user";
import { Exception } from "@adonisjs/core/exceptions";
import { Authenticator } from "@adonisjs/auth";
import { Authenticators } from "@adonisjs/auth/types";
import DB from '@adonisjs/lucid/services/db'
import BaseApiResponseDTO from "../dtos/response/base_api_response_dto.js";
import { AccountBlockchainService } from "./blockchain/account_blockchain_service.js";
import { Web3 } from "web3";
import Account from "#models/account";
import db from '@adonisjs/lucid/services/db'
import { besuURL } from "#config/app";

export class AuthService {
  constructor() { }
  public async register(data: { fullName: string; email: string; password: string }) {
    const trx = await db.transaction()
    try {
      const user = await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password
      })
      const web3 = new Web3(besuURL);
      const accountBlockchainService = new AccountBlockchainService(web3)
      const blockchainAccount = accountBlockchainService.criarConta()
      const account = await Account.create({
        privateKeyHash: blockchainAccount.privateKey,
        canSendTransactions: false,
        address: blockchainAccount.address,
      })
      user.accountId = account.id;
      await user.save()
      await trx.commit()
      return user
    } catch (error) {
      if (error.code == 23505) {
        throw new Exception("E-mail e/ou senha invalidos", { code: 'E_UNIQUE', status: 400 })
      }
      await trx.rollback()
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