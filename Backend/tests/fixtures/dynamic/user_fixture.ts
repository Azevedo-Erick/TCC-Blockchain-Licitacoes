import { AuthService } from "#services/auth_service"
import { UserService } from "#services/user_service"
import { ApiClient } from "@japa/api-client"

export default async function autenticar(client: ApiClient, authService: AuthService, userService: UserService) {
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

    return login(client, user)
}

export async function login(client: ApiClient, user: { email: string, password: string }) {
    const response = await client.post('/api/v1/auth/login').form({
        email: user.email,
        password: user.password
    })

    const jsonResponse = response.body()
    return { token: jsonResponse.data.token, user }
}