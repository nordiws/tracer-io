import { Test } from '@nestjs/testing';
import { defaultPlant } from '../helpers';
import { PlantDTO } from '../../../src/models/plant.dto';
import { PlantService } from '../../../src/services/plant.service';
import { Repository } from 'typeorm';
import { Plant } from '../../../src/entities/plant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlantService', () => {
    let plantService: PlantService;
    let plantRepository: Repository<Plant>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlantService,
                {
                    provide: getRepositoryToken(Plant),
                    useClass: Repository,
                },
            ],
        }).compile();

        plantService = moduleRef.get<PlantService>(PlantService);
        plantRepository = moduleRef.get<Repository<Plant>>(getRepositoryToken(Plant));
    });

    describe('get', () => {
        it('should return a plant', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const mockPlant = plantDto.toEntity();
            mockPlant.id = plantId;
            jest.spyOn(plantRepository, 'findOne').mockResolvedValueOnce(mockPlant);

            const result = await plantService.get(plantId);

            expect(plantRepository.findOne).toHaveBeenCalledWith({ where: { id: plantId } });
            expect(result).toEqual(mockPlant);
        });
    });

    describe('getAll', () => {
        it('should return an array of plants', async () => {
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const plant1 = plantDto.toEntity();
            plant1.id = '1';
            const plant2 = plantDto.toEntity();
            plant2.id = '2';
            const mockPlants = [plant1, plant2];
            jest.spyOn(plantRepository, 'find').mockResolvedValueOnce(mockPlants);

            const result = await plantService.getAll();

            expect(plantRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockPlants);
        });
    });

    describe('create', () => {
        it('should create a new plant', async () => {
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const createdPlant = plantDto.toEntity();
            jest.spyOn(plantRepository, 'save').mockResolvedValueOnce(createdPlant);

            const result = await plantService.create(plantDto);

            expect(plantRepository.save).toHaveBeenCalledWith(createdPlant);
            expect(result).toEqual(createdPlant);
        });
    });

    describe('update', () => {
        it('should update an existing plant', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const updatedPlant = plantDto.toEntity();
            updatedPlant.id = plantId;
            jest.spyOn(plantRepository, 'save').mockResolvedValueOnce(updatedPlant);

            const result = await plantService.update(plantId, plantDto);

            expect(plantRepository.save).toHaveBeenCalledWith(updatedPlant);
            expect(result).toEqual(updatedPlant);
        });
    });

    describe('delete', () => {
        it('should delete a plant', async () => {
            const plantId = '1';
            jest.spyOn(plantRepository, 'delete').mockResolvedValueOnce(undefined);

            await expect(plantService.delete(plantId)).resolves.toBeUndefined();
            expect(plantRepository.delete).toHaveBeenCalledWith(plantId);
        });
    });
});