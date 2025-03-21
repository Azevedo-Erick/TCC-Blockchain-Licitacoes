import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class SyncBlockchain extends BaseCommand {
  static commandName = 'sync:blockchain'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "SyncBlockchain"')
  }
}