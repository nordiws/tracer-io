import { TypeOrmModuleOptions } from '@nestjs/typeorm'

require('dotenv').config()

class TypeOrmConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

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

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getEnv('POSTGRES_HOST'),
      port: parseInt(this.getEnv('POSTGRES_PORT')),
      username: this.getEnv('POSTGRES_USER'),
      password: this.getEnv('POSTGRES_PASSWORD'),
      database: this.getEnv('POSTGRES_DATABASE'),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      synchronize: !this.isProduction(),
    }
  }
}

const typeOrmConfig = new TypeOrmConfig(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
])

export { typeOrmConfig }
