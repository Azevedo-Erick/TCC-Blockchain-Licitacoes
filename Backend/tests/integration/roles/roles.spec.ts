import Permission from '#models/permission'
import Role from '#models/role'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('RolesController - Gerenciamento de Cargos', (group) => {
    group.each.setup(async () => await testUtils.db().withGlobalTransaction())


    test('Deve listar todos os cargos com suas permissões', async ({ client, assert }) => {
        try {

            const cargo = await Role.create({ name: 'Administrador' })
            const permissao = await Permission.create({ name: 'gerenciar_usuarios' })
            await cargo.related('permissions').attach([permissao.id])
        } catch (e) {
            console.log(e)
        }

        const resposta = await client.get('/api/v1/roles')
        resposta.assertStatus(200)
        assert.lengthOf(resposta.body(), 1)
        assert.equal(resposta.body()[0].name, 'Administrador')
        assert.equal(resposta.body()[0].permissions[0].name, 'gerenciar_usuarios')
    })

    test('Deve criar um cargo com permissões associadas', async ({ client, assert }) => {
        const p1 = await Permission.create({ name: 'criar_relatorios' })
        const p2 = await Permission.create({ name: 'editar_clientes' })

        const resposta = await client.post('/api/v1/roles').json({
            name: 'Gerente',
            permissions: [p1.id, p2.id],
        })

        resposta.assertStatus(200)
        const cargo = await Role.query().where('name', 'Gerente').preload('permissions').firstOrFail()
        assert.lengthOf(cargo.permissions, 2)
        assert.sameMembers(cargo.permissions.map((p: Permission) => p.name), ['criar_relatorios', 'editar_clientes'])
    })

    test('Não deve criar um cargo sem nome válido', async ({ client }) => {
        const resposta = await client.post('/api/v1/roles').json({
            name: '',
            permissions: [],
        })

        resposta.assertStatus(422);
    })

    test('Deve exibir um cargo específico pelo ID, incluindo suas permissões', async ({ client, assert }) => {
        const cargo = await Role.create({ name: 'Analista' })
        const permissao = await Permission.create({ name: 'visualizar_dados' })
        await cargo.related('permissions').attach([permissao.id])

        const resposta = await client.get(`/api/v1/roles/${cargo.id}`)
        resposta.assertStatus(200)
        assert.equal(resposta.body().name, 'Analista')
        assert.equal(resposta.body().permissions[0].name, 'visualizar_dados')
    })

    test('Deve retornar 404 se o cargo não existir', async ({ client }) => {
        const resposta = await client.get('/api/v1/roles/9999')
        resposta.assertStatus(404)
    })

    test('Deve atualizar o nome e permissões de um cargo existente', async ({ client, assert }) => {
        const cargo = await Role.create({ name: 'Atendente' })
        const novaPermissao = await Permission.create({ name: 'responder_clientes' })

        const resposta = await client.patch(`/api/v1/roles/${cargo.id}`).json({
            name: 'Atendimento',
            permissions: [novaPermissao.id],
        })

        resposta.assertStatus(200)
        const atualizado = await Role.query().where('id', cargo.id).preload('permissions').firstOrFail()
        assert.equal(atualizado.name, 'Atendimento')
        assert.lengthOf(atualizado.permissions, 1)
        assert.equal(atualizado.permissions[0].name, 'responder_clientes')
    })

    test('Deve excluir um cargo existente', async ({ client, assert }) => {
        const cargo = await Role.create({ name: 'Temporário' })

        const resposta = await client.delete(`/api/v1/roles/${cargo.id}`)
        resposta.assertStatus(200)

        const resultado = await Role.find(cargo.id)
        assert.isNull(resultado)
    })

    test('Deve adicionar uma permissão a um cargo existente', async ({ client, assert }) => {
        const cargo = await Role.create({ name: 'Moderador' })
        const permissao = await Permission.create({ name: 'banir_usuarios' })

        const resposta = await client.post(`/api/v1/roles/${cargo.id}/permissions`).json({
            permission_id: permissao.id,
        })

        resposta.assertStatus(200)

        await cargo.load('permissions')
        assert.lengthOf(cargo.permissions, 1)
        assert.equal(cargo.permissions[0].name, 'banir_usuarios')
    })

    test('Não deve adicionar permissão inexistente', async ({ client }) => {
        const cargo = await Role.create({ name: 'Auxiliar' })

        const resposta = await client.post(`/roles/${cargo.id}/permissions`).json({
            permission_id: 9999,
        })

        resposta.assertStatus(404)
    })

    test('Deve remover uma permissão de um cargo', async ({ client, assert }) => {
        const cargo = await Role.create({ name: 'Supervisor' })
        const permissao = await Permission.create({ name: 'gerenciar_setores' })
        await cargo.related('permissions').attach([permissao.id])

        const resposta = await client.delete(`/api/v1/roles/${cargo.id}/permissions`).json({
            permission_id: permissao.id,
        })

        resposta.assertStatus(200)
        await cargo.load('permissions')
        assert.lengthOf(cargo.permissions, 0)
    })

    test('Deve remover todas as permissões de um cargo', async ({ client, assert }) => {
        const cargo = await Role.create({ name: 'Operador' })
        const p1 = await Permission.create({ name: 'ver_estoque' })
        const p2 = await Permission.create({ name: 'atualizar_produto' })

        await cargo.related('permissions').attach([p1.id, p2.id])

        const resposta = await client.delete(`/api/v1/roles/${cargo.id}/permissions/clear`)
        resposta.assertStatus(200)

        await cargo.load('permissions')
        assert.lengthOf(cargo.permissions, 0)
    })
})
