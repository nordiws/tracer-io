import { Test } from '@nestjs/testing';
import { defaultHarvest } from '../helpers';
import { HarvestDTO } from '../../../src/models/harvest.dto';
import { HarvestService } from '../../../src/services/harvest.service';
import { Repository } from 'typeorm/repository/Repository';
import { Harvest } from '../../../src/entities/harvest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('HarvestService', () => {
    let harvestService: HarvestService;
    let harvestRepository: Repository<Harvest>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                HarvestService,
                {
                    provide: getRepositoryToken(Harvest),
                    useClass: Repository,
                },
            ],
        }).compile();

        harvestService = moduleRef.get<HarvestService>(HarvestService);
        harvestRepository = moduleRef.get<Repository<Harvest>>(getRepositoryToken(Harvest));
    });

    describe('get', () => {
        it('should return a harvest', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const mockHarvest = harvestDto.toEntity();
            mockHarvest.id = harvestId;
            jest.spyOn(harvestRepository, 'findOne').mockResolvedValueOnce(mockHarvest);

            const result = await harvestService.get(harvestId);

            expect(harvestRepository.findOne).toHaveBeenCalledWith({ where: { id: harvestId } });
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
            jest.spyOn(harvestRepository, 'find').mockResolvedValueOnce(mockHarvests);

            const result = await harvestService.getAll();

            expect(harvestRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockHarvests);
        });
    });

    describe('create', () => {
        it('should create a new harvest', async () => {
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const createdHarvest = harvestDto.toEntity();
            jest.spyOn(harvestRepository, 'save').mockResolvedValueOnce(createdHarvest);

            const result = await harvestService.create(harvestDto);

            expect(harvestRepository.save).toHaveBeenCalledWith(createdHarvest);
            expect(result).toEqual(createdHarvest);
        });
    });

    describe('update', () => {
        it('should update an existing harvest', async () => {
            const harvestId = '1';
            const harvestDto = HarvestDTO.fromObj(defaultHarvest);
            const updatedHarvest = harvestDto.toEntity();
            updatedHarvest.id = harvestId;
            jest.spyOn(harvestRepository, 'save').mockResolvedValueOnce(updatedHarvest);

            const result = await harvestService.update(harvestId, harvestDto);

            expect(harvestRepository.save).toHaveBeenCalledWith(updatedHarvest);
            expect(result).toEqual(updatedHarvest);
        });
    });

    describe('delete', () => {
        it('should delete a harvest', async () => {
            const harvestId = '1';
            jest.spyOn(harvestRepository, 'delete').mockResolvedValueOnce(undefined);

            await harvestService.delete(harvestId);
            expect(harvestRepository.delete).toHaveBeenCalledWith(harvestId);
        });
    });
});