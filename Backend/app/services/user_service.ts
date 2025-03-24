import { besuURL } from "#config/app";
import User from "#models/user";
import { Web3 } from "web3";
import { AccountBlockchainService } from "./blockchain/account_blockchain_service.js";
import Account from "#models/account";
import { QueryClientContract, TransactionClientContract } from "@adonisjs/lucid/types/database";
import Role from "#models/role";

export class UserService {
  async changeRole(id: number, roleId: number, currentUser: User) {
    if (currentUser.id == id) {
      throw new Error("Você não pode alterar seu próprio cargo");
    }
    const user = await User.findOrFail(id);
    if (!user) {
      return null;
    }
    const role = await Role.findOrFail(roleId);
    if (!role) {
      return null;
    }
    await user.related('role').associate(role);
    return user;
  }


  public async findWithAccount(id: number): Promise<User | null> {
    return User.query()
      .where('id', id)
      .preload('account')
      .first()
  }

  async addPermission(id: string) {
    try {

      const user = await User.findOrFail(id);
      if (!user) {
        return null;
      }
      const account = await user.related('account').query().first();
      if (!account) {
        return null;
      }
      const web3 = new Web3(besuURL);
      const accountService = new AccountBlockchainService(web3);
      await accountService.addPermissionToAccount(account.address);
      account.canSendTransactions = true;
      await account.save();
      return account;
    } catch (e) {
      console.log(e);
      return { error: e.message };
    }
  }

  async createAccount(id: string, dbTransaction: TransactionClientContract) {
    try {
      const user = await User.findOrFail(id);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      const web3 = new Web3(besuURL);
      const accountBlockchainService = new AccountBlockchainService(web3)
      const blockchainAccount = accountBlockchainService.criarConta()
      const account = new Account();
      account.privateKeyHash = blockchainAccount.privateKey;
      account.canSendTransactions = false;
      account.address = blockchainAccount.address;
      account.userId = user.id;
      account.useTransaction(dbTransaction)
      await account.save()
      return account;
    } catch (e) {
      throw new Error(e.message);
    }
  }

}