import { Test } from '@nestjs/testing';
import { defaultStrain } from '../helpers';
import { StrainDTO } from '../../../src/models/strain.dto';
import { Strain } from '../../../src/entities/strain.entity';
import { Repository } from 'typeorm';
import { StrainService } from '../../../src/services/strain.service';
import { StrainController } from '../../../src/controllers/strain.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StrainController', () => {
    let strainController: StrainController;
    let strainService: StrainService;
    let strainRepository: Repository<Strain>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [StrainController],
            providers: [
                StrainService,
                {
                    provide: getRepositoryToken(Strain),
                    useClass: Repository,
                },
            ],
        }).compile();

        strainController = moduleRef.get<StrainController>(StrainController);
        strainService = moduleRef.get<StrainService>(StrainService);
        strainRepository = moduleRef.get<Repository<Strain>>(getRepositoryToken(Strain));
    });

    describe('findAll', () => {
        it('should return an array of strains', async () => {
            const mockStrains: Strain[] = []; // Mock the expected array of strains
            jest.spyOn(strainService, 'getAll').mockResolvedValueOnce(mockStrains);

            const result = await strainController.findAll();

            expect(result).toBe(mockStrains);
            expect(strainService.getAll).toHaveBeenCalled();
        });
    });

    describe('findStrain', () => {
        it('should return a strain by id', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const mockStrain = strainDto.toEntity();
            mockStrain.id = strainId;
            jest.spyOn(strainService, 'get').mockResolvedValueOnce(mockStrain);

            const result = await strainController.findStrain({ id: strainId });

            expect(result).toBe(mockStrain);
            expect(strainService.get).toHaveBeenCalledWith(strainId);
        });
    });

    describe('createStrain', () => {
        it('should create a new strain', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const mockStrain = strainDto.toEntity();
            mockStrain.id = strainId;
            jest.spyOn(strainService, 'create').mockResolvedValueOnce(mockStrain);

            const result = await strainController.createStrain(strainDto);

            expect(result).toBe(mockStrain);
            expect(strainService.create).toHaveBeenCalledWith(strainDto);
        });
    });

    describe('updateStrain', () => {
        it('should update a strain', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const mockStrain = strainDto.toEntity();
            mockStrain.id = strainId;
            jest.spyOn(strainService, 'update').mockResolvedValueOnce(mockStrain);

            const result = await strainController.updateStrain({ id: strainId }, strainDto);

            expect(result).toBe(mockStrain);
            expect(strainService.update).toHaveBeenCalledWith(strainId, strainDto);
        });
    });

    describe('deleteStrain', () => {
        it('should delete a strain', async () => {
            const strainId = '1';
            jest.spyOn(strainRepository, 'delete').mockResolvedValueOnce(undefined);

            await strainController.deleteStrain({ id: strainId });

            expect(strainRepository.delete).toHaveBeenCalledWith(strainId);
        });
    });
});