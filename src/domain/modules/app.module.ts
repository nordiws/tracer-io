import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '../../config/typeorm.config'
import { Plant } from '../../adapters/entities/plant.entity'
import { Strain } from '../../adapters/entities/strain.entity'
import { Harvest } from '../../adapters/entities/harvest.entity'
import { PlantsModule } from './plant.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeOrmConfig.getTypeOrmConfig([Plant, Harvest, Strain])),
        PlantsModule
    ],
})
export class AppModule { }
