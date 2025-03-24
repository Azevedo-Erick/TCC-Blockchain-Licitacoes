import { AccountBlockchainService } from "#services/blockchain/account_blockchain_service";
import BlockchainLicitanteService from "#services/blockchain/licitante/licitante_service";
import { test } from "@japa/runner";
import { Web3 } from "web3";


let provider: BlockchainLicitanteService;
let accountProvider: AccountBlockchainService;

test.group("LicitacoesConcorrenciaSelecaoMenorPrecoService", (group) => {
    group.setup(() => {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        provider = new BlockchainLicitanteService(web3);
        accountProvider = new AccountBlockchainService(new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")));
    });

    test("Um usuário com permissão deve poder criar uma instância de contrato", async ({ assert }, done) => {
        const account = accountProvider.criarConta();
        await accountProvider.addPermissionToAccount(account.address);
        const result = await provider.deploy(
            account.address,
            account.privateKey,
            "nomeFantasia",
            "razaoSocial",
            "cnpj",
            1
        );
        console.log("Endereço do contrato:", result.contractAddress);
        assert.isTrue(result.success);
        assert.match(result.contractAddress, /^0x/);
        done();
    })
        .waitForDone()
        .timeout(30000);
});