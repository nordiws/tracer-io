import { Test } from '@nestjs/testing';
import { Harvest } from '../../../src/adapters/entities/harvest.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { HarvestRepository } from '../../../src/adapters/repositories/harvest.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { defaultHarvest } from '../helpers';



describe('HarvestRepository', () => {
    let repository: HarvestRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                HarvestRepository,
                {
                    provide: getRepositoryToken(Harvest),
                    useClass: Repository,
                },
            ],
        }).compile();

        repository = moduleRef.get<HarvestRepository>(HarvestRepository);
    });

    describe('getHarvest', () => {
        it('should return the harvest with the provided id', async () => {
            const expectedHarvest: Harvest = { id: "1", ...defaultHarvest };
            jest.spyOn(repository, 'findOne').mockResolvedValue(expectedHarvest);

            const result = await repository.getHarvest(expectedHarvest);
            expect(result).toEqual(expectedHarvest);
        });
    });

    describe('getHarvests', () => {
        it('should return an array of harvests', async () => {
            const expectedHarvests: Harvest[] = [
                { id: "1", ...defaultHarvest },
                { id: "2", ...defaultHarvest },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(expectedHarvests);

            const result = await repository.getHarvests();
            expect(result).toEqual(expectedHarvests);
        });
    });

    describe('createHarvest', () => {
        it('should return the created harvest', async () => {
            const harvest: Harvest = { id: "1", ...defaultHarvest };
            jest.spyOn(repository, 'save').mockResolvedValue(harvest);

            const result = await repository.createHarvest(harvest);
            expect(result).toEqual(harvest);
        });
    });

    describe('updateHarvest', () => {
        it('should return the updated harvest if it exists', async () => {
            const harvest: Harvest = { id: "1", ...defaultHarvest };
            const foundHarvest: Harvest = { id: "1", ...defaultHarvest };
            jest.spyOn(repository, 'findOne').mockResolvedValue(foundHarvest);
            jest.spyOn(repository, 'update').mockResolvedValue(undefined);

            const result = await repository.updateHarvest(harvest);
            expect(result).toEqual(harvest);
        });

        it('should throw an EntityNotFoundError if the harvest does not exist', async () => {
            const harvest: Harvest = { id: "1", ...defaultHarvest };
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            await expect(repository.updateHarvest(harvest)).rejects.toThrowError(EntityNotFoundError);
        });
    });

    describe('deleteHarvest', () => {
        it('should delete the harvest', async () => {
            const harvest: Harvest = { id: "1", ...defaultHarvest }
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            await repository.deleteHarvest(harvest);
            expect(repository.delete).toHaveBeenCalledWith(harvest.id);
        });
    });
});