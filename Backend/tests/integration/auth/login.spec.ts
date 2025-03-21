import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Auth - Login', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())


    test('deve autenticar usuário válido', async ({ client }) => {
        await User.create({
            fullName: 'Login Teste',
            email: 'login@email.com',
            password: 'senha123'
        })

        const response = await client.post('/login').form({
            email: 'login@email.com',
            password: 'senha123'
        })

        response.assertStatus(200)
        response.assertBodyContains({ token: response.body().token })
    })

    test('não deve autenticar com senha errada', async ({ client }) => {
        await User.create({
            fullName: 'Login Teste',
            email: 'login@email.com',
            password: 'senha123'
        })

        const response = await client.post('/login').form({
            email: 'login@email.com',
            password: 'senhaerrada'
        })

        response.assertStatus(401)
        response.assertBodyContains({ message: 'Credenciais inválidas' })
    })
})
