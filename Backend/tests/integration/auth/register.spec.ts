import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Auth - Register', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('deve registrar um novo usuário', async ({ client, assert }) => {
        const response = await client.post('/register').form({
            fullName: 'Usuário Teste',
            email: 'teste@email.com',
            password: 'senha123'
        })

        response.assertStatus(201)
        response.assertBodyContains({ message: 'Usuário registrado com sucesso' })

        const user = await User.findBy('email', 'teste@email.com')
        assert.isNotNull(user)
    })

    test('não deve registrar usuário com email duplicado', async ({ client }) => {
        await User.create({
            fullName: 'Usuário Teste',
            email: 'teste@email.com',
            password: 'senha123'
        })

        const response = await client.post('/register').form({
            fullName: 'Outro Nome',
            email: 'teste@email.com',
            password: 'outraSenha'
        })

        response.assertStatus(400)
        response.assertBodyContains({ message: 'E-mail ou senha invalidos' })
    })
})