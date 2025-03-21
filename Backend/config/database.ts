import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const isTestEnv = env.get('NODE_ENV') === 'test'

const dbConfig = defineConfig({
  connection: isTestEnv ? 'sqlite' : env.get('DB_CONNECTION') || 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    sqlite: {
      client: 'sqlite3',
      connection: {
        filename: env.get('DB_DATABASE', './tmp/dev.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
      },
      debug: false,
    }
  },
})

export default dbConfig