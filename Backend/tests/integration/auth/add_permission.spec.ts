import AuthController from "#controllers/auth_controller";
import { AuthService } from "#services/auth_service";
import { UserService } from "#services/user_service";
import testUtils from "@adonisjs/core/services/test_utils"
import { ApiClient } from "@japa/api-client";
import { test } from "@japa/runner"

let userService: UserService;
let authService: AuthService;
test.group('Group - Add Permission', (group) => {
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

    test('Um usuario autenticado e com permissao deve poder alterar o cargo de outro usuario', async ({ client }) => {
        const { token } = await autenticar(client, { blockchainAccess: true })
        const permissions = {

        }
        const response = await client
            .post('/auth/add-permission')
            .header('Authorization', `Bearer ${token}`)
    })
})