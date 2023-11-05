import { Test } from '@nestjs/testing';
import { defaultHarvest } from '../helpers';
import { HarvestDTO } from '../../../src/models/harvest.dto';
import { Harvest } from '../../../src/entities/harvest.entity';
import { Repository } from 'typeorm';
import { HarvestService } from '../../../src/services/harvest.service';
import { HarvestController } from '../../../src/controllers/harvest.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HarvestController', () => {
    let harvestController: HarvestController;
    let harvestService: HarvestService;
    let harvestRepository: Repository<Harvest>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [HarvestController],
            providers: [
                HarvestService,
                {
                    provide: getRepositoryToken(Harvest),
                    useClass: Repository,
                },
            ],
        }).compile();

        harvestController = moduleRef.get<HarvestController>(HarvestController);
        harvestService = moduleRef.get<HarvestService>(HarvestService);
        harvestRepository = moduleRef.get<Repository<Harvest>>(getRepositoryToken(Harvest));
    });

    describe('findAll', () => {
        it('should return an array of harvests', async () => {
            const mockHarvests: Harvest[] = []; // Mock the expected array of harvests
            jest.spyOn(harvestService, 'getAll').mockResolvedValueOnce(mockHarvests);

            const result = await harvestController.findAll();

            expect(result).toBe(mockHarvests);
            expect(harvestService.getAll).toHaveBeenCalled();
        });
    });

    describe('findHarvest', () => {
        it('should return a harvest by id', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const mockHarvest = harvestDto.toEntity();
            mockHarvest.id = harvestId;
            jest.spyOn(harvestService, 'get').mockResolvedValueOnce(mockHarvest);

            const result = await harvestController.findHarvest({ id: harvestId });

            expect(result).toBe(mockHarvest);
            expect(harvestService.get).toHaveBeenCalledWith(harvestId);
        });
    });

    describe('createHarvest', () => {
        it('should create a new harvest', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const mockHarvest = harvestDto.toEntity();
            mockHarvest.id = harvestId;
            jest.spyOn(harvestService, 'create').mockResolvedValueOnce(mockHarvest);

            const result = await harvestController.createHarvest(harvestDto);

            expect(result).toBe(mockHarvest);
            expect(harvestService.create).toHaveBeenCalledWith(harvestDto);
        });
    });

    describe('updateHarvest', () => {
        it('should update a harvest', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const mockHarvest = harvestDto.toEntity();
            mockHarvest.id = harvestId;
            jest.spyOn(harvestService, 'update').mockResolvedValueOnce(mockHarvest);

            const result = await harvestController.updateHarvest({ id: harvestId }, harvestDto);

            expect(result).toBe(mockHarvest);
            expect(harvestService.update).toHaveBeenCalledWith(harvestId, harvestDto);
        });
    });

    describe('deleteHarvest', () => {
        it('should delete a harvest', async () => {
            const harvestId = '1';
            jest.spyOn(harvestRepository, 'delete').mockResolvedValueOnce(undefined);

            await harvestController.deleteHarvest({ id: harvestId });

            expect(harvestRepository.delete).toHaveBeenCalledWith(harvestId);
        });
    });
});