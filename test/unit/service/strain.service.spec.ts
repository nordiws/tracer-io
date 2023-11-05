import { Test } from '@nestjs/testing';
import { defaultStrain } from '../helpers';
import { StrainDTO } from '../../../src/models/strain.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Strain } from '../../../src/entities/strain.entity';
import { StrainService } from '../../../src/services/strain.service';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('StrainService', () => {
    let strainService: StrainService;
    let strainRepository: Repository<Strain>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                StrainService,
                {
                    provide: getRepositoryToken(Strain),
                    useClass: Repository,
                },
            ],
        }).compile();

        strainService = moduleRef.get<StrainService>(StrainService);
        strainRepository = moduleRef.get<Repository<Strain>>(getRepositoryToken(Strain));
    });

    describe('get', () => {
        it('should return a strain', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const mockStrain = strainDto.toEntity();
            mockStrain.id = strainId;
            jest.spyOn(strainRepository, 'findOne').mockResolvedValueOnce(mockStrain);

            const result = await strainService.get(strainId);

            expect(strainRepository.findOne).toHaveBeenCalledWith({ where: { id: strainId } });
            expect(result).toEqual(mockStrain);
        });
    });

    describe('getAll', () => {
        it('should return an array of strains', async () => {
            const strainDto = StrainDTO.fromObj(defaultStrain)
            const strain1 = strainDto.toEntity()
            strain1.id = "1"
            const strain2 = strainDto.toEntity()
            strain2.id = "2"
            const mockStrains = [strain1, strain2];
            jest.spyOn(strainRepository, 'find').mockResolvedValueOnce(mockStrains);

            const result = await strainService.getAll();

            expect(strainRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockStrains);
        });
    });

    describe('create', () => {
        it('should create a new strain', async () => {
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const createdStrain = strainDto.toEntity();
            jest.spyOn(strainRepository, 'save').mockResolvedValueOnce(createdStrain);

            const result = await strainService.create(strainDto);

            expect(strainRepository.save).toHaveBeenCalledWith(createdStrain);
            expect(result).toEqual(createdStrain);
        });
    });

    describe('update', () => {
        it('should update an existing strain', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const updatedStrain = strainDto.toEntity();
            updatedStrain.id = strainId;
            jest.spyOn(strainRepository, 'save').mockResolvedValueOnce(updatedStrain);

            const result = await strainService.update(strainId, strainDto);

            expect(strainRepository.save).toHaveBeenCalledWith(updatedStrain);
            expect(result).toEqual(updatedStrain);
        });
    });

    describe('delete', () => {
        it('should delete a strain', async () => {
            const strainId = '1';
            jest.spyOn(strainRepository, 'delete').mockResolvedValueOnce(undefined);

            await strainService.delete(strainId);
            expect(strainRepository.delete).toHaveBeenCalledWith(strainId);
        });
    });
});