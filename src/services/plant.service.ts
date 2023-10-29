import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PlantDTO } from '../models/plant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from '../entities/plant.entity';

@Injectable()
export class PlantService {
    constructor(@InjectRepository(Plant) private readonly repository: Repository<Plant>) { }

    public async get(id: string): Promise<Plant> {
        return await this.repository.findOne({ where: { id } });
    }

    public async getAll(): Promise<Plant[]> {
        return await this.repository.find();
    }

    public async create(plantDto: PlantDTO): Promise<Plant> {
        return await this.repository.save(plantDto.toEntity());
    }

    public async update(id: string, plantDto: PlantDTO): Promise<Plant> {
        const plant = plantDto.toEntity()
        plant.id = id
        return await this.repository.save(plant);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}