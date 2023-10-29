import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestDTO } from '../models/harvest.dto';
import { Harvest } from '../entities/harvest.entity';

@Injectable()
export class HarvestService {
    constructor(@InjectRepository(Harvest) private readonly repository: Repository<Harvest>) { }

    public async get(id: string): Promise<Harvest> {
        return await this.repository.findOne({ where: { id } });
    }

    public async getAll(): Promise<Harvest[]> {
        return await this.repository.find();
    }

    public async create(harvestDto: HarvestDTO): Promise<Harvest> {
        return await this.repository.save(harvestDto.toEntity());
    }

    public async update(id: string, harvestDto: HarvestDTO): Promise<Harvest> {
        const harvest = harvestDto.toEntity()
        harvest.id = id
        return await this.repository.save(harvest);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}