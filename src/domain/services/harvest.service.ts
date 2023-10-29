import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestDTO } from '../models/harvest.dto';
import { Harvest } from '../../adapters/entities/harvest.entity';
import { HarvestRepository } from '../../adapters/repositories/harvest.repository';
import { IHarvestRepository } from '../../adapters/interfaces/harvest.interface';

@Injectable()
export class HarvestService {
    constructor(@InjectRepository(HarvestRepository) private readonly repository: IHarvestRepository) { }

    public async get(id: string): Promise<Harvest> {
        return await this.repository.getHarvest(id);
    }

    public async getAll(): Promise<Harvest[]> {
        return await this.repository.getHarvests();
    }

    public async create(harvestDto: HarvestDTO): Promise<Harvest> {
        return await this.repository.createHarvest(harvestDto.toEntity());
    }

    public async update(id: string, harvestDto: HarvestDTO): Promise<Harvest> {
        const harvest = harvestDto.toEntity()
        harvest.id = id
        return await this.repository.updateHarvest(harvest);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.deleteHarvest(id);
    }
}