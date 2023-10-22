import { Test } from '@nestjs/testing';
import { Plant } from '../../src/models/plant.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { PlantRepository } from '../../src/repositories/plant.repository';
import { getRepositoryToken } from '@nestjs/typeorm';

const defaultPlant = {
    name: 'Test Plant',
    date_planted: undefined,
    flower_period: undefined,
    date_harvest: undefined,
    date_stored: undefined,
    plants_qty: '',
    genteic_origin: '',
    strain: [],
    harvest: [],
    description: '',
    active: false,
    created: undefined,
    updated: undefined
};

describe('PlantRepository', () => {
    let repository: PlantRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlantRepository,
                {
                    provide: getRepositoryToken(Plant),
                    useClass: Repository,
                },
            ],
        }).compile();

        repository = moduleRef.get<PlantRepository>(PlantRepository);
    });

    describe('getPlant', () => {
        it('should return the plant with the provided id', async () => {
            const expectedPlant: Plant = { id: 1, ...defaultPlant };
            jest.spyOn(repository, 'findOne').mockResolvedValue(expectedPlant);

            const result = await repository.getPlant(expectedPlant);
            expect(result).toEqual(expectedPlant);
        });
    });

    describe('getPlants', () => {
        it('should return an array of plants', async () => {
            const expectedPlants: Plant[] = [
                { id: 1, ...defaultPlant },
                { id: 2, ...defaultPlant },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(expectedPlants);

            const result = await repository.getPlants();
            expect(result).toEqual(expectedPlants);
        });
    });

    describe('createPlant', () => {
        it('should return the created plant', async () => {
            const plant: Plant = { id: 1, ...defaultPlant };
            jest.spyOn(repository, 'save').mockResolvedValue(plant);

            const result = await repository.createPlant(plant);
            expect(result).toEqual(plant);
        });
    });

    describe('updatePlant', () => {
        it('should return the updated plant if it exists', async () => {
            const plant: Plant = { id: 1, ...defaultPlant };
            const foundPlant: Plant = { id: 1, ...defaultPlant };
            jest.spyOn(repository, 'findOne').mockResolvedValue(foundPlant);
            jest.spyOn(repository, 'update').mockResolvedValue(undefined);

            const result = await repository.updatePlant(plant);
            expect(result).toEqual(plant);
        });

        it('should throw an EntityNotFoundError if the plant does not exist', async () => {
            const plant: Plant = { id: 1, ...defaultPlant };
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            await expect(repository.updatePlant(plant)).rejects.toThrowError(EntityNotFoundError);
        });
    });

    describe('deletePlant', () => {
        it('should delete the plant', async () => {
            const plant: Plant = { id: 1, ...defaultPlant }
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            await repository.deletePlant(plant);
            expect(repository.delete).toHaveBeenCalledWith(plant.id);
        });
    });
});