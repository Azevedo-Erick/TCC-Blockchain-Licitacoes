import vine from '@vinejs/vine'

export const createRoleValidation = vine.compile(
    vine.object({
        name: vine.string().trim().maxLength(255),
        permissions: vine.array(vine.number()).nullable()
    })
)

export const editRoleValidation = vine.compile(
    vine.object({
        name: vine.string().trim().maxLength(255),
        permissions: vine.array(vine.number()).nullable()
    })
)

export const addPermissionToRoleValidation = vine.compile(
    vine.object({
        permission_id: vine.number().withoutDecimals().min(1)
    })
)

export const removePermissionFromRoleValidation = vine.compile(
    vine.object({
        permission_id: vine.number().withoutDecimals().min(1)
    })
)