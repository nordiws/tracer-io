import { TypeOrmModuleOptions } from '@nestjs/typeorm'

require('dotenv').config()

class TypeOrmConfig {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getEnv(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }
    return value
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getEnv(k, true))
    return this
  }

  public getPort() {
    return this.getEnv('PORT', true)
  }

  public isProduction() {
    return this.getEnv('MODE', false) != 'DEV'
  }

  public getTypeOrmConfig(entities: any): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getEnv('DB_HOST'),
      port: parseInt(this.getEnv('DB_PORT')),
      username: this.getEnv('DB_USER'),
      password: this.getEnv('DB_PASSWORD'),
      database: this.getEnv('DB_DATABASE'),
      entities,
      migrationsTableName: 'migration',
      migrations: ['src/adapters/repositories/migration/*.js'],
      synchronize: !this.isProduction(),
    }
  }
}

const typeOrmConfig = new TypeOrmConfig(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
])

export { typeOrmConfig }
