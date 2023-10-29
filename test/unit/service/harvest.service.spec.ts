import { Test } from '@nestjs/testing';
import { defaultHarvest } from '../helpers';
import { HarvestDTO } from '../../../src/domain/models/harvest.dto';
import { HarvestService } from '../../../src/domain/services/harvest.service';
import { HarvestRepository } from '../../../src/adapters/repositories/harvest.repository';

describe('HarvestService', () => {
    let harvestService: HarvestService;
    let harvestRepository: HarvestRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                HarvestService,
                {
                    provide: HarvestRepository,
                    useValue: {
                        getHarvest: jest.fn(),
                        getHarvests: jest.fn(),
                        createHarvest: jest.fn(),
                        updateHarvest: jest.fn(),
                        deleteHarvest: jest.fn(),
                    },
                },
            ],
        }).compile();

        harvestService = moduleRef.get<HarvestService>(HarvestService);
        harvestRepository = moduleRef.get<HarvestRepository>(HarvestRepository);
    });

    describe('get', () => {
        it('should return a harvest', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const mockHarvest = harvestDto.toEntity();
            mockHarvest.id = harvestId;
            (harvestRepository.getHarvest as jest.Mock).mockResolvedValueOnce(mockHarvest);

            const result = await harvestService.get(harvestId);

            expect(harvestRepository.getHarvest).toHaveBeenCalledWith(harvestId);
            expect(result).toEqual(mockHarvest);
        });
    });

    describe('getAll', () => {
        it('should return an array of harvests', async () => {
            const harvestDto = HarvestDTO.fromObj(defaultHarvest)
            const harvest1 = harvestDto.toEntity()
            harvest1.id = "1"
            const harvest2 = harvestDto.toEntity()
            harvest2.id = "2"
            const mockHarvests = [harvest1, harvest2];
            (harvestRepository.getHarvests as jest.Mock).mockResolvedValueOnce(mockHarvests);

            const result = await harvestService.getAll();

            expect(harvestRepository.getHarvests).toHaveBeenCalled();
            expect(result).toEqual(mockHarvests);
        });
    });

    describe('create', () => {
        it('should create a new harvest', async () => {
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const createdHarvest = harvestDto.toEntity();
            (harvestRepository.createHarvest as jest.Mock).mockResolvedValueOnce(createdHarvest);

            const result = await harvestService.create(harvestDto);

            expect(harvestRepository.createHarvest).toHaveBeenCalledWith(createdHarvest);
            expect(result).toEqual(createdHarvest);
        });
    });

    describe('update', () => {
        it('should update an existing harvest', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const updatedHarvest = harvestDto.toEntity();
            updatedHarvest.id = harvestId;
            (harvestRepository.updateHarvest as jest.Mock).mockResolvedValueOnce(updatedHarvest);

            const result = await harvestService.update(harvestId, harvestDto);

            expect(harvestRepository.updateHarvest).toHaveBeenCalledWith(updatedHarvest);
            expect(result).toEqual(updatedHarvest);
        });
    });

    describe('delete', () => {
        it('should delete a harvest', async () => {
            const harvestId = '1';
            await harvestService.delete(harvestId);
            expect(harvestRepository.deleteHarvest).toHaveBeenCalledWith(harvestId);
        });
    });
});