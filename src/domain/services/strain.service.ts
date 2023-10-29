import { Injectable } from '@nestjs/common';
import { StrainDTO } from '../models/strain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Strain } from '../../adapters/entities/strain.entity';
import { StrainRepository } from '../../adapters/repositories/strain.repository';
import { IStrainRepository } from '../../adapters/interfaces/strain.interface';

@Injectable()
export class StrainService {
    constructor(@InjectRepository(StrainRepository) private readonly repository: IStrainRepository) { }

    public async get(id: string): Promise<Strain> {
        return await this.repository.getStrain(id);
    }

    public async getAll(): Promise<Strain[]> {
        return await this.repository.getStrains();
    }

    public async create(strainDto: StrainDTO): Promise<Strain> {
        return await this.repository.createStrain(strainDto.toEntity());
    }

    public async update(id: string, strainDto: StrainDTO): Promise<Strain> {
        const strain = strainDto.toEntity()
        strain.id = id
        return await this.repository.updateStrain(strain);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.deleteStrain(id);
    }
}