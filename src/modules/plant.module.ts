import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from '../entities/plant.entity';
import { PlantService } from '../services/plant.service';
import { PlantController } from '../controllers/plant.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Plant])],
    providers: [PlantService],
    controllers: [PlantController],
})
export class PlantsModule { }