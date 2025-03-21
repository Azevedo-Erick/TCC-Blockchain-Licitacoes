import vine from '@vinejs/vine'

export const addPermissionValidator = vine.compile(vine.object({
    address: vine.string().trim().minLength(42).maxLength(42).regex(/^0x[a-fA-F0-9]{40}$/),
}))
