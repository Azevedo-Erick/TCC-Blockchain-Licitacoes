import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Auth - Logout', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())


    test('deve deslogar o usuário autenticado', async ({ client }) => {
        await User.create({
            fullName: 'Logout Teste',
            email: 'logout@email.com',
            password: await 'senha123'
        })

        const loginResponse = await client.post('/login').form({
            email: 'logout@email.com',
            password: 'senha123'
        })

        const token = loginResponse.body().token

        const response = await client.get('/logout').bearerToken(token)

        response.assertStatus(200)
        response.assertBodyContains({ message: 'Logout realizado com sucesso' })
    })

    test('não deve permitir logout sem token', async ({ client }) => {
        const response = await client.get('/logout')
        response.assertStatus(401)
    })
})
