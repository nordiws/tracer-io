import { Test } from '@nestjs/testing';
import { Strain } from '../../../src/adapters/entities/strain.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { StrainRepository } from '../../../src/adapters/repositories/strain.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { defaultStrain } from '../helpers';

describe('StrainRepository', () => {
    let repository: StrainRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                StrainRepository,
                {
                    provide: getRepositoryToken(Strain),
                    useClass: Repository,
                },
            ],
        }).compile();

        repository = moduleRef.get<StrainRepository>(StrainRepository);
    });

    describe('getStrain', () => {
        it('should return the strain with the provided id', async () => {
            const expectedStrain: Strain = { id: "1", ...defaultStrain };
            jest.spyOn(repository, 'findOne').mockResolvedValue(expectedStrain);

            const result = await repository.getStrain(expectedStrain.id);
            expect(result).toEqual(expectedStrain);
        });
    });

    describe('getStrains', () => {
        it('should return an array of strains', async () => {
            const expectedStrains: Strain[] = [
                { id: "1", ...defaultStrain },
                { id: "2", ...defaultStrain },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(expectedStrains);

            const result = await repository.getStrains();
            expect(result).toEqual(expectedStrains);
        });
    });

    describe('createStrain', () => {
        it('should return the created strain', async () => {
            const strain: Strain = { id: "1", ...defaultStrain };
            jest.spyOn(repository, 'save').mockResolvedValue(strain);

            const result = await repository.createStrain(strain);
            expect(result).toEqual(strain);
        });
    });

    describe('updateStrain', () => {
        it('should return the updated strain if it exists', async () => {
            const strain: Strain = { id: "1", ...defaultStrain };
            const foundStrain: Strain = { id: "1", ...defaultStrain };
            jest.spyOn(repository, 'findOne').mockResolvedValue(foundStrain);
            jest.spyOn(repository, 'update').mockResolvedValue(undefined);

            const result = await repository.updateStrain(strain);
            expect(result).toEqual(strain);
        });

        it('should throw an EntityNotFoundError if the strain does not exist', async () => {
            const strain: Strain = { id: "1", ...defaultStrain };
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            await expect(repository.updateStrain(strain)).rejects.toThrowError(EntityNotFoundError);
        });
    });

    describe('deleteStrain', () => {
        it('should delete the strain', async () => {
            const id = "1"
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            await repository.deleteStrain(id);
            expect(repository.delete).toHaveBeenCalledWith(id);
        });
    });
});