import { Web3 } from "web3";
import { ResponseCriarContaOutputDto } from "../../dtos/result/create_account_result_dto.js";
import BesuAddPermissionResultDto from "../../dtos/result/besu_add_permission_result_dto.js";



export class AccountBlockchainService {
  private readonly web3: Web3;

  constructor(web3: Web3) {
    this.web3 = web3;
  }

  public criarConta(): ResponseCriarContaOutputDto {
    const account = this.web3.eth.accounts.create();
    return {
      address: account.address,
      privateKey: account.privateKey
    };
  }

  async addPermissionToAccount(accountAddress: string): Promise<BesuAddPermissionResultDto | null> {

    if (!accountAddress) {
      throw new Error("Account address is required");
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(accountAddress)) {
      throw new Error(`Invalid Ethereum address: ${accountAddress}`);
    }

    const requestBody = {
      jsonrpc: "2.0",
      method: "perm_addAccountsToWhitelist",
      params: [[accountAddress]],
      id: 1
    };

    try {
      const response = await fetch("http://127.0.0.1:8545", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const resultJson = (await response.json()) as BesuAddPermissionResultDto;

      if (resultJson.error) {
        throw new Error(`Erro na resposta JSON: ${resultJson.error.message}`);
      }

      return resultJson.result ?? null;
    } catch (error) {
      console.error("Erro ao adicionar permissão à conta:", error);
      throw error;
    }
  }
}