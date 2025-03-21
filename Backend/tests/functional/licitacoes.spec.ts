import { test } from "@japa/runner";
import { Web3 } from "web3";
import LicitacoesConcorrenciaSelecaoMenorPrecoService from "#services/blockchain/licitacao_concorrencia_selecao_menor_preco/licitacao_concorrencia_selecao_menor_preco_service";
import { AccountBlockchainService } from "#services/blockchain/account_blockchain_service";
import { criarDadosLicitacao } from "#tests/fixtures/static/licitacao_fixture";

let provider: LicitacoesConcorrenciaSelecaoMenorPrecoService;
let accountProvider: AccountBlockchainService;

test.group("LicitacoesConcorrenciaSelecaoMenorPrecoService", (group) => {
    group.setup(() => {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        provider = new LicitacoesConcorrenciaSelecaoMenorPrecoService(web3);
        accountProvider = new AccountBlockchainService(new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545")));
    });

    test("Os providers a serem testados devem estar definidos", ({ assert }) => {
        assert.isDefined(provider);
        assert.isDefined(accountProvider);
    });

    test("Um usuário com permissão deve poder criar uma instância de contrato", async ({ assert }) => {
        const account = accountProvider.criarConta();
        await accountProvider.addPermissionToAccount(account.address);
        const result = await provider.deployLicitacaoSelecaoMenorPrecoContract(account.address, account.privateKey);
        console.log("Endereço do contrato:", result.contractAddress);
        assert.isTrue(result.success);
        assert.match(result.contractAddress, /^0x/);
    }).timeout(30000);

    test("Deve atualizar o estado da licitação e verificar mudança no estágio", async ({ assert }) => {
        const account = accountProvider.criarConta();
        await accountProvider.addPermissionToAccount(account.address);
        const dadosLicitacao = criarDadosLicitacao(account);

        const result = await provider.criarLicitacaoSelecaoMenorPreco(dadosLicitacao);

        if (!result.success) {
            throw new Error("Erro ao criar contrato");
        };

        assert.isDefined(result);
        assert.isDefined(result.contractAddress);

        const contractAddress = result.contractAddress!;
        const estagioInicial = await provider.consultarEstagio(contractAddress);

        console.log("Estágio Inicial:", estagioInicial);

        const transaction = await provider.atualizarEstado(account.address, contractAddress, account.privateKey);

        assert.isDefined(transaction);
        assert.match(transaction.transactionHash.toString(), /^0x/);

        const estagioAtualizado = await provider.consultarEstagio(contractAddress);
        console.log("Estágio Atualizado:", estagioAtualizado);

        assert.notEqual(estagioAtualizado, estagioInicial);
    }).timeout(30000);

    test("Um usuário com permissão deve poder criar uma instância de contrato com dados", async ({ assert }) => {
        const account = accountProvider.criarConta();

        await accountProvider.addPermissionToAccount(account.address);

        const dadosLicitacao = criarDadosLicitacao(account);
        const result = await provider.criarLicitacaoSelecaoMenorPreco(dadosLicitacao);

        assert.isDefined(result);
    }).timeout(30000);

    test("Um usuário com permissao deve poder criar uma instância de contrato e ver os detalhes", async ({ assert }) => {
        const account = accountProvider.criarConta();

        await accountProvider.addPermissionToAccount(account.address);

        const dadosLicitacao = criarDadosLicitacao(account);
        const result = await provider.criarLicitacaoSelecaoMenorPreco(dadosLicitacao);

        if (!result.success) {
            throw new Error("Erro ao criar contrato");
        }

        const detalhes = await provider.detalhesLicitacao(result.contractAddress!);
        const doesDataMatch = detalhes.titulo === dadosLicitacao.titulo &&
            detalhes.descricao === dadosLicitacao.descricao &&
            detalhes.hashEdital === dadosLicitacao.hashEdital &&
            detalhes.hashETP === dadosLicitacao.hashETP &&
            detalhes.dataInicio.getTime() === dadosLicitacao.dataInicio * 1000 &&
            detalhes.dataInicioCandidaturas.getTime() === dadosLicitacao.dataInicioCandidaturas * 1000 &&
            detalhes.dataFimCandidaturas.getTime() === dadosLicitacao.dataFimCandidaturas * 1000;
        console.log("Detalhes da licitação:", detalhes);
        console.log("Dados da licitação:", dadosLicitacao);

        assert.isTrue(doesDataMatch);
    }).timeout(30000);

    test("Um usuário sem permissão não deve poder criar uma instância de contrato", async ({ assert }) => {
        let expected = true;
        let isCorect = false;
        try {
            const account = accountProvider.criarConta();
            const dadosLicitacao = criarDadosLicitacao(account);
            const result = await provider.criarLicitacaoSelecaoMenorPreco(dadosLicitacao);
            assert.isFalse(result.success);
        } catch (e) {
            isCorect = true;
        }
        assert.equal(isCorect, expected);
    }).timeout(30000);

    test("Deve enviar uma candidatura com sucesso", async ({ assert }) => {
        const account = accountProvider.criarConta();

        await accountProvider.addPermissionToAccount(account.address);

        const dadosLicitacao = criarDadosLicitacao(account);


        const contrato = await provider.criarLicitacaoSelecaoMenorPreco(dadosLicitacao);

        if (!contrato) {
            return
        };

        assert.isDefined(contrato);
        assert.isDefined(contrato.contractAddress);

        const contractAddress = contrato.contractAddress!;

        await provider.atualizarEstado(account.address, contractAddress, account.privateKey);

        const estagio = await provider.consultarEstagio(contractAddress);
        console.log("Estágio atual antes da candidatura:", estagio);

        assert.equal(estagio, 1);

        const candidaturaDto = {
            enderecoContrato: contractAddress,
            proposta: "hashCandidatura123",
            enderecoRemetente: account.address,
            chavePrivada: account.privateKey,
        };

        const transaction = await provider.enviarCandidatura(candidaturaDto);

        assert.isDefined(transaction);
        assert.match(transaction.hashTransacao!, /^0x/);

        const candidatos = await provider.consultarCandidatos(contractAddress);
        console.log("Candidatos registrados:", candidatos);

        assert.include(candidatos, account.address);
    }).timeout(40000);
});