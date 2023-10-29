import { EntityNotFoundError } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Harvest } from "../entities/harvest.entity";
import { IHarvestRepository } from "../interfaces/harvest.interface";

export class HarvestRepository extends Repository<Harvest> implements IHarvestRepository {

    async getHarvest(id: string): Promise<Harvest> {
        return this.findOne({ where: { id: id } });
    }

    async getHarvests(): Promise<Harvest[]> {
        return this.find();
    }

    async createHarvest(harvest: Harvest): Promise<Harvest> {
        return this.save(harvest);
    }

    async updateHarvest(harvest: Harvest): Promise<Harvest> {
        const foundHarvest = await this.findOne({ where: { id: harvest.id } })
        if (foundHarvest) {
            await this.update(harvest.id, harvest);
            return harvest;
        } else {
            throw new EntityNotFoundError('HarvestRepository', harvest.id);
        }
    }

    async deleteHarvest(id: string): Promise<void> {
        await this.delete(id);
    }
}