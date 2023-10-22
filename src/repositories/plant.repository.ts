import { EntityNotFoundError } from "typeorm";
import { Plant } from "src/models/plant.entity";
import { Repository } from "typeorm/repository/Repository";
import { IPlantRepository } from "src/interfaces/plant.interface";

export class PlantRepository extends Repository<Plant> implements IPlantRepository {

    async getPlant(plant: Plant): Promise<Plant> {
        return this.findOne({ where: { id: plant.id } });
    }

    async getPlants(): Promise<Plant[]> {
        return this.find();
    }

    async createPlant(plant: Plant): Promise<Plant> {
        return this.save(plant);
    }

    async updatePlant(plant: Plant): Promise<Plant> {
        const foundPlant = await this.findOne({ where: { id: plant.id } })
        if (foundPlant) {
            await this.update(plant.id, plant);
            return plant
        } else {
            throw new EntityNotFoundError('PlantRepository', plant.id)
        }
    }

    async deletePlant(plant: Plant): Promise<void> {
        await this.delete(plant.id);
    }
}