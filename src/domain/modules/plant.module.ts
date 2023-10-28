import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from '../../adapters/entities/plant.entity';
import { PlantService } from '../../domain/services/plant.service';
import { PlantController } from '../../domain/controllers/plant.controller';
import { PlantRepository } from '../../adapters/repositories/plant.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Plant, PlantRepository])],
    providers: [PlantService],
    controllers: [PlantController],
})
export class PlantsModule { }