import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PermissionEnum } from '../../app/enums/permission_enum.js'

export default class extends BaseSeeder {
  async run() {
    await Permission.updateOrCreateMany('name',
      Object.values(PermissionEnum).map(element => {
        return {
          name: element
        }
      }))
  }
}