import { EntityNotFoundError } from "typeorm";
import { Harvest } from "src/models/harvest.entity";
import { Repository } from "typeorm/repository/Repository";
import { IHarvestRepository } from "src/interfaces/harvest.interface";

export class HarvestRepository extends Repository<Harvest> implements IHarvestRepository {

    async getHarvest(harvest: Harvest): Promise<Harvest> {
        return this.findOne({ where: { id: harvest.id } });
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

    async deleteHarvest(harvest: Harvest): Promise<void> {
        await this.delete(harvest.id);
    }
}