import type { Strings } from '@helia/strings'
import { Helia } from '@helia/http'

declare module '@adonisjs/core/types' {
    export interface ContainerBindings {
        helia: {
            helia: Helia
            strings: Strings
        }
    }
}