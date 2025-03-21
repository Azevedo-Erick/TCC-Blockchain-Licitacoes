import Permission from '#models/permission'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const adminRole = await Role.updateOrCreate(
      { name: 'admin' },
      { name: 'admin' }
    )

    const allPermissions = await Permission.all()

    await adminRole.related('permissions').sync(allPermissions.map(p => p.id))
  }
}