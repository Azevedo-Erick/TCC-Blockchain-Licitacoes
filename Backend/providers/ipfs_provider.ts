import type { ApplicationService } from '@adonisjs/core/types'
import { strings } from '@helia/strings'
import { createHeliaHTTP } from '@helia/http'
export default class IpfsProvider {
  constructor(protected app: ApplicationService) { }

  /**
   * Register bindings to the container
   */
  async register() {
    const helia = await createHeliaHTTP()
    const heliaStrings = strings(helia)

    this.app.container.singleton('helia', () => {
      return {
        helia,
        strings: heliaStrings,
      }
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() { }

  /**
   * The application has been booted
   */
  async start() { }

  /**
   * The process has been started
   */
  async ready() { }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() { }
}