import { ApiTags } from '@nestjs/swagger';
import { PlantDTO } from '../models/plant.dto';
import { Plant } from '../../adapters/entities/plant.entity';
import { PlantService } from '../../domain/services/plant.service';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';

interface IPlantController {
    id: string
}

@ApiTags("PlantController")
@Controller("plant")
export class PlantController {
    constructor(private readonly plantService: PlantService) { }

    @Get()
    findAll(): Promise<Plant[]> {
        return this.plantService.getAll();
    }
    @Get(":id")
    findPlant(@Param() params: IPlantController): Promise<Plant> {
        return this.plantService.get(params.id);
    }
    @Post()
    createPlant(@Body() plantDto: PlantDTO): Promise<Plant> {
        return this.plantService.create(plantDto);
    }
    @Post(":id")
    udpatePlant(@Param() params: IPlantController, @Body() plantDto: PlantDTO): Promise<Plant> {
        return this.plantService.update(params.id, plantDto);
    }
    @Delete(":id")
    deletePlant(@Param() params: IPlantController): Promise<void> {
        return this.plantService.delete(params.id);
    }
}
