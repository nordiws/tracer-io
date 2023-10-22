import { Repository } from 'typeorm';
import { Plant } from 'src/models/plant.entity';

export interface IPlantRepository extends Repository<Plant> {
    getPlant(plant: Plant): Promise<Plant>
    getPlants(): Promise<Plant[]>
    createPlant(plant: Plant): Promise<Plant>
    updatePlant(plant: Plant): Promise<Plant>
    deletePlant(plant: Plant): void
}