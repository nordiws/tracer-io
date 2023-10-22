import { Repository } from 'typeorm';
import { Harvest } from 'src/models/harvest.entity';

export interface IHarvestRepository extends Repository<Harvest> {
    getHarvest(harvest: Harvest): Promise<Harvest>
    getHarvests(): Promise<Harvest[]>
    createHarvest(harvest: Harvest): Promise<Harvest>
    updateHarvest(harvest: Harvest): Promise<Harvest>
    deleteHarvest(harvest: Harvest): void
}