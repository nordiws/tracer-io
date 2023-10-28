import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from '../../adapters/entities/plant.entity';
import { PlantDTO } from '../models/plant.dto';
import { IPlantRepository } from '../../adapters/interfaces/plant.interface';
import { PlantRepository } from '../../adapters/repositories/plant.repository';

@Injectable()
export class PlantService {
    constructor(@InjectRepository(PlantRepository) private readonly repository: IPlantRepository) { }

    public async get(id: string): Promise<Plant> {
        return await this.repository.getPlant(id);
    }

    public async getAll(): Promise<Plant[]> {
        return await this.repository.getPlants();
    }

    public async create(plantDto: PlantDTO): Promise<Plant> {
        return await this.repository.createPlant(plantDto.toEntity());
    }

    public async update(id: string, plantDto: PlantDTO): Promise<Plant> {
        const plant = plantDto.toEntity()
        plant.id = id
        return await this.repository.updatePlant(plant);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.deletePlant(id);
    }
}