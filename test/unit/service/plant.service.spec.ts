import { Test } from '@nestjs/testing';
import { defaultPlant } from '../helpers';
import { PlantDTO } from '../../../src/models/plant.dto';
import { PlantService } from '../../../src/domain/services/plant.service';
import { PlantRepository } from '../../../src/adapters/repositories/plant.repository';

describe('PlantService', () => {
    let plantService: PlantService;
    let plantRepository: PlantRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlantService,
                {
                    provide: PlantRepository,
                    useValue: {
                        getPlant: jest.fn(),
                        getPlants: jest.fn(),
                        createPlant: jest.fn(),
                        updatePlant: jest.fn(),
                        deletePlant: jest.fn(),
                    },
                },
            ],
        }).compile();

        plantService = moduleRef.get<PlantService>(PlantService);
        plantRepository = moduleRef.get<PlantRepository>(PlantRepository);
    });

    describe('get', () => {
        it('should return a plant', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const mockPlant = plantDto.toEntity();
            mockPlant.id = plantId;
            (plantRepository.getPlant as jest.Mock).mockResolvedValueOnce(mockPlant);

            const result = await plantService.get(plantId);

            expect(plantRepository.getPlant).toHaveBeenCalledWith(plantId);
            expect(result).toEqual(mockPlant);
        });
    });

    describe('getAll', () => {
        it('should return an array of plants', async () => {
            const plantDto = PlantDTO.fromObj(defaultPlant)
            const plant1 = plantDto.toEntity()
            plant1.id = "1"
            const plant2 = plantDto.toEntity()
            plant2.id = "2"
            const mockPlants = [plant1, plant2];
            (plantRepository.getPlants as jest.Mock).mockResolvedValueOnce(mockPlants);

            const result = await plantService.getAll();

            expect(plantRepository.getPlants).toHaveBeenCalled();
            expect(result).toEqual(mockPlants);
        });
    });

    describe('create', () => {
        it('should create a new plant', async () => {
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const createdPlant = plantDto.toEntity();
            (plantRepository.createPlant as jest.Mock).mockResolvedValueOnce(createdPlant);

            const result = await plantService.create(plantDto);

            expect(plantRepository.createPlant).toHaveBeenCalledWith(createdPlant);
            expect(result).toEqual(createdPlant);
        });
    });

    describe('update', () => {
        it('should update an existing plant', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant);
            const updatedPlant = plantDto.toEntity();
            updatedPlant.id = plantId;
            (plantRepository.updatePlant as jest.Mock).mockResolvedValueOnce(updatedPlant);

            const result = await plantService.update(plantId, plantDto);

            expect(plantRepository.updatePlant).toHaveBeenCalledWith(updatedPlant);
            expect(result).toEqual(updatedPlant);
        });
    });

    describe('delete', () => {
        it('should delete a plant', async () => {
            const plantId = '1';
            await plantService.delete(plantId);
            expect(plantRepository.deletePlant).toHaveBeenCalledWith(plantId);
        });
    });
});