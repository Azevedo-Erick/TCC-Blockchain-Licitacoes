import { test } from '@japa/runner'
import path from 'path'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import { ApiClient } from '@japa/api-client'
import { AccountBlockchainService } from '#services/blockchain/account_blockchain_service'
import { UserService } from '#services/user_service'
import { AuthService } from '#services/auth_service'


let userService: UserService;
let authService: AuthService;
test.group('LicitacoesController', (group) => {
    group.each.setup(() => {
        userService = new UserService();
        authService = new AuthService(userService);
        return testUtils.db().withGlobalTransaction()
    })

    async function autenticar(client: ApiClient, overrides = {} as {
        blockchainAccess?: boolean
    }) {
        const user = {
            fullName: 'Login Teste',
            email: 'login@email.com',
            password: 'senha123'
        }

        const dbUser = await authService.register(user)
        if (!dbUser) {
            throw new Error('Erro ao criar usuário')
        }
        await userService.addPermission(dbUser?.id.toString())

        const response = await client.post('/login').form({
            email: user.email,
            password: user.password
        })

        const jsonResponse = response.body()
        return { token: jsonResponse.data.token, user }
    }

    const filePaths = {
        etp: path.resolve('tests/files/etp.pdf'),
        edital: path.resolve('tests/files/edital.pdf'),
    }

    // --- TESTES DE CRIAÇÃO ---
    test('deve criar licitação com sucesso', async ({ client, assert }, done) => {
        const { token } = await autenticar(client, { blockchainAccess: true })
        const response = await client
            .post('/licitacoes')
            .header('Authorization', `Bearer ${token}`)
            .field('tituloLicitacao', 'Nova Licitação')
            .field('descricaoLicitacao', 'Descrição qualquer')
            .field('dataInicio', new Date().toISOString())
            .field('dataInicioCandidaturas', new Date(Date.now() + 86400000).toISOString())
            .field('dataFimCandidaturas', new Date(Date.now() + 172800000).toISOString())
            .file('etp', filePaths.etp, 'etp.pdf')
            .file('edital', filePaths.edital, 'edital.pdf')
        console.log(response.body())
        response.assertStatus(200)
        response.assertBodyContains({ message: 'Licitação criada com sucesso!' })
        assert.exists(response.body().licitacao.hash_etp)
        assert.exists(response.body().licitacao.hash_edital)
        done()
    }).waitForDone()

    test('não deve criar licitação sem autenticação', async ({ client }, done) => {
        const response = await client
            .post('/licitacoes')
            .field('tituloLicitacao', 'Nova Licitação')
            .field('descricaoLicitacao', 'Descrição qualquer')
            .field('dataInicio', new Date().toISOString())
            .field('dataInicioCandidaturas', new Date(Date.now() + 86400000).toISOString())
            .field('dataFimCandidaturas', new Date(Date.now() + 172800000).toISOString())
            .file('etp', filePaths.etp)
            .file('edital', filePaths.edital)

        response.assertStatus(401)
        response.assertBodyContains({ message: 'Usuário não autenticado' })
        done()
    })

    test('não deve criar licitação sem arquivos', async ({ client }) => {
        const { token } = await autenticar(client, { blockchainAccess: true })

        const response = await client
            .post('/licitacoes')
            .header('Authorization', `Bearer ${token}`)
            .field('tituloLicitacao', 'Nova Licitação')
            .field('descricaoLicitacao', 'Descrição qualquer')
            .field('dataInicio', new Date().toISOString())
            .field('dataInicioCandidaturas', new Date(Date.now() + 86400000).toISOString())
            .field('dataFimCandidaturas', new Date(Date.now() + 172800000).toISOString())

        response.assertStatus(400)
        response.assertBodyContains({ message: 'Os arquivos ETP e Edital são obrigatórios.' })
    })

    test('não deve criar licitação se usuário não tem acesso blockchain', async ({ client }) => {
        const { token } = await autenticar(client, { blockchainAccess: false })

        const response = await client
            .post('/licitacoes')
            .header('Authorization', `Bearer ${token}`)
            .field('tituloLicitacao', 'Nova Licitação')
            .field('descricaoLicitacao', 'Descrição qualquer')
            .field('dataInicio', new Date().toISOString())
            .field('dataInicioCandidaturas', new Date(Date.now() + 86400000).toISOString())
            .field('dataFimCandidaturas', new Date(Date.now() + 172800000).toISOString())
            .file('etp', filePaths.etp)
            .file('edital', filePaths.edital)

        response.assertStatus(400)
        response.assertBodyContains({ message: 'Usuário não possui acesso à blockchain' }) // ajuste conforme o `UserHasBlockchainAccess`
    })

    // --- TESTES DE DETALHES ---
    /* test('deve retornar detalhes de uma licitação existente', async ({ client, assert }) => {
        const { user } = await autenticar(client, { blockchainAccess: true })

        const licitacao = await Licitacao.create({
            titulo: 'Licitação Detalhe',
            descricao: 'Detalhes aqui',
            hashEtp: 'hashEtp123',
            hashEdital: 'hashEdital123',
            dataInicio: DateTime.fromJSDate(new Date()),
            dataInicioCandidaturas: DateTime.fromJSDate(new Date()),
            dataFimCandidaturas: DateTime.fromJSDate(new Date()),
            userId: user.id,
        })

        const response = await client.get(`/licitacoes/${licitacao.id}`)

        response.assertStatus(200)
        assert.equal(response.body().titulo, 'Licitação Detalhe')
        assert.equal(response.body().hashETP, 'hashEtp123')
    }) */

    test('deve retornar erro para licitação inexistente', async ({ client }) => {
        const response = await client.get('/licitacoes/99999')

        response.assertStatus(500)
        response.assertBodyContains({ message: 'Erro ao buscar licitação' })
    })
})
