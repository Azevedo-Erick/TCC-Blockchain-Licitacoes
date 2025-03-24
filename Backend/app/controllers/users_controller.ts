// import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class UsersController {
    constructor(private readonly userService: UserService) { }

    async changeRole({ params, response, auth }: HttpContext) {
        try {

            const user = await this.userService.changeRole(params.id, params.role, auth.user!);
            return response.status(200).json(user);
        } catch (e) {
            return response.status(400).json({ message: e.message });
        }
    }

}