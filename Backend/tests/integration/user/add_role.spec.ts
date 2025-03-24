import Role from '#models/role'
import User from '#models/user'
import { login } from '#tests/fixtures/dynamic/user_fixture'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User - Change Role', (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())

    test('deve permitir que um usuário mude o cargo de outro usuário', async ({ client, assert }) => {
        const adminRole = await Role.create({ name: 'Admin' })
        const userRole = await Role.create({ name: 'User' })

        const admin = await User.create({
            fullName: 'Admin',
            email: 'admin@email.com',
            password: 'senha123',
            roleId: adminRole.id,
        })

        const user = await User.create({
            fullName: 'Usuário',
            email: 'user@email.com',
            password: 'senha123',
            roleId: userRole.id,
        })

        const newRole = await Role.create({ name: 'Moderator' })

        const { token } = await login(client, {
            email: admin.email,
            password: 'senha123',
        })

        const response = await client
            .patch(`/api/v1/users/${user.id}/role/${newRole.id}`)
            .bearerToken(token)

        response.assertStatus(200)

        await user.refresh()
        assert.equal(user.roleId, newRole.id)
    })

    test('não deve permitir que o usuário altere seu próprio cargo', async ({ client }) => {
        const role = await Role.create({ name: 'User' })
        const role2 = await Role.create({ name: 'Admin' })
        const user = await User.create({
            fullName: 'Usuário',
            email: 'user@email.com',
            password: 'senha123',
            roleId: role.id,
        })

        const { token } = await login(client, {
            email: user.email,
            password: 'senha123',
        })


        const response = await client
            .patch(`/api/v1/users/${user.id}/role/${role2.id}`)
            .bearerToken(token)

        response.assertStatus(400)
        response.assertBodyContains({
            message: 'Você não pode alterar seu próprio cargo',
        })
    })

    test('deve retornar 404 se o usuário não existir', async ({ client }) => {
        const role = await Role.create({ name: 'Admin' })
        const admin = await User.create({
            fullName: 'Admin',
            email: 'admin@email.com',
            password: 'senha123',
            roleId: role.id,
        })

        const { token } = await login(client, {
            email: admin.email,
            password: 'senha123',
        })

        const response = await client
            .patch('/api/v1/users/9999/role/1')
            .bearerToken(token)


        response.assertStatus(400)
    })

    test('deve retornar 404 se o cargo não existir', async ({ client }) => {
        const role = await Role.create({ name: 'Admin' })
        const admin = await User.create({
            fullName: 'Admin',
            email: 'admin@email.com',
            password: 'senha123',
            roleId: role.id,
        })

        const user = await User.create({
            fullName: 'Usuário',
            email: 'user@email.com',
            password: 'senha123',
            roleId: role.id,
        })
        const { token } = await login(client, {
            email: admin.email,
            password: 'senha123',
        })

        const response = await client
            .patch(`/api/v1/users/${user.id}/role/9999`)
            .bearerToken(token)

        response.assertStatus(400)
    })
})
