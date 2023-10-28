import { Repository } from 'typeorm';
import { Plant } from 'src/adapters/entities/plant.entity';

export interface IPlantRepository extends Repository<Plant> {
    getPlant(id: string): Promise<Plant>
    getPlants(): Promise<Plant[]>
    createPlant(plant: Plant): Promise<Plant>
    updatePlant(plant: Plant): Promise<Plant>
    deletePlant(id: string): void
}