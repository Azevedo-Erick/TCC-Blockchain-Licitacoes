import { besuURL } from "#config/app";
import User from "#models/user";
import { Authenticator } from "@adonisjs/auth";
import { Authenticators } from "@adonisjs/auth/types";
import { Web3 } from "web3";
import { AccountBlockchainService } from "./blockchain/account_blockchain_service.js";

export class UserService {


  public async findWithAccount(id: number): Promise<User | null> {
    return User.query()
      .where('id', id)
      .preload('account')
      .first()
  }

  async addPermission(id: string, auth: Authenticator<Authenticators>) {
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

}