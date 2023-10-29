import { Test } from '@nestjs/testing';
import { defaultStrain } from '../helpers';
import { StrainDTO } from '../../../src/domain/models/strain.dto';
import { StrainService } from '../../../src/domain/services/strain.service';
import { StrainRepository } from '../../../src/adapters/repositories/strain.repository';


describe('StrainService', () => {
    let strainService: StrainService;
    let strainRepository: StrainRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                StrainService,
                {
                    provide: StrainRepository,
                    useValue: {
                        getStrain: jest.fn(),
                        getStrains: jest.fn(),
                        createStrain: jest.fn(),
                        updateStrain: jest.fn(),
                        deleteStrain: jest.fn(),
                    },
                },
            ],
        }).compile();

        strainService = moduleRef.get<StrainService>(StrainService);
        strainRepository = moduleRef.get<StrainRepository>(StrainRepository);
    });

    describe('get', () => {
        it('should return a strain', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const mockStrain = strainDto.toEntity();
            mockStrain.id = strainId;
            (strainRepository.getStrain as jest.Mock).mockResolvedValueOnce(mockStrain);

            const result = await strainService.get(strainId);

            expect(strainRepository.getStrain).toHaveBeenCalledWith(strainId);
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
            (strainRepository.getStrains as jest.Mock).mockResolvedValueOnce(mockStrains);

            const result = await strainService.getAll();

            expect(strainRepository.getStrains).toHaveBeenCalled();
            expect(result).toEqual(mockStrains);
        });
    });

    describe('create', () => {
        it('should create a new strain', async () => {
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const createdStrain = strainDto.toEntity();
            (strainRepository.createStrain as jest.Mock).mockResolvedValueOnce(createdStrain);

            const result = await strainService.create(strainDto);

            expect(strainRepository.createStrain).toHaveBeenCalledWith(createdStrain);
            expect(result).toEqual(createdStrain);
        });
    });

    describe('update', () => {
        it('should update an existing strain', async () => {
            const strainId = '1';
            const strainDto = StrainDTO.fromObj(defaultStrain);
            const updatedStrain = strainDto.toEntity();
            updatedStrain.id = strainId;
            (strainRepository.updateStrain as jest.Mock).mockResolvedValueOnce(updatedStrain);

            const result = await strainService.update(strainId, strainDto);

            expect(strainRepository.updateStrain).toHaveBeenCalledWith(updatedStrain);
            expect(result).toEqual(updatedStrain);
        });
    });

    describe('delete', () => {
        it('should delete a strain', async () => {
            const strainId = '1';
            await strainService.delete(strainId);
            expect(strainRepository.deleteStrain).toHaveBeenCalledWith(strainId);
        });
    });
});