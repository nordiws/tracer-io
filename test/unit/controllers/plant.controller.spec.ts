import { Test } from '@nestjs/testing';
import { defaultPlant } from '../helpers';
import { PlantDTO } from '../../../src/models/plant.dto';
import { Plant } from '../../../src/adapters/entities/plant.entity';
import { PlantService } from '../../../src/domain/services/plant.service'
import { PlantController } from '../../../src/domain/controllers/plant.controller';
import { PlantRepository } from '../../../src/adapters/repositories/plant.repository';

describe('PlantController', () => {
    let plantController: PlantController;
    let plantService: PlantService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PlantController],
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

        plantController = moduleRef.get<PlantController>(PlantController);
        plantService = moduleRef.get<PlantService>(PlantService);
    });

    describe('findAll', () => {
        it('should return an array of plants', async () => {
            const mockPlants: Plant[] = []; // Mock the expected array of plants
            jest.spyOn(plantService, 'getAll').mockResolvedValueOnce(mockPlants);

            const result = await plantController.findAll();

            expect(result).toBe(mockPlants);
            expect(plantService.getAll).toHaveBeenCalled();
        });
    });

    describe('findPlant', () => {
        it('should return a plant by id', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant)
            const mockPlant = plantDto.toEntity();
            mockPlant.id = plantId
            jest.spyOn(plantService, 'get').mockResolvedValueOnce(mockPlant);

            const result = await plantController.findPlant({ id: plantId });

            expect(result).toBe(mockPlant);
            expect(plantService.get).toHaveBeenCalledWith(plantId);
        });
    });

    describe('createPlant', () => {
        it('should create a new plant', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant)
            const mockPlant = plantDto.toEntity();
            mockPlant.id = plantId
            jest.spyOn(plantService, 'create').mockResolvedValueOnce(mockPlant);

            const result = await plantController.createPlant(plantDto);

            expect(result).toBe(mockPlant);
            expect(plantService.create).toHaveBeenCalledWith(plantDto);
        });
    });

    describe('udpatePlant', () => {
        it('should update a plant', async () => {
            const plantId = '1';
            const plantDto = PlantDTO.fromObj(defaultPlant)
            const mockPlant = plantDto.toEntity();
            mockPlant.id = plantId
            jest.spyOn(plantService, 'update').mockResolvedValueOnce(mockPlant);

            const result = await plantController.udpatePlant({ id: plantId }, plantDto);

            expect(result).toBe(mockPlant);
            expect(plantService.update).toHaveBeenCalledWith(plantId, plantDto);
        });
    });

    describe('deletePlant', () => {
        it('should delete a plant', async () => {
            const plantId = '1';
            jest.spyOn(plantService, 'delete').mockResolvedValueOnce(undefined)

            await plantController.deletePlant({ id: plantId });

            expect(plantService.delete).toHaveBeenCalledWith(plantId);
        });
    });
});