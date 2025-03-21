// import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class UsersController {
    constructor(private readonly userService: UserService) { }

    public addPermission({ params, auth }: HttpContext) {
        return this.userService.addPermission(params.id, auth);

    }
}