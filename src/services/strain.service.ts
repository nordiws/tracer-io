import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StrainDTO } from '../models/strain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Strain } from '../entities/strain.entity';

@Injectable()
export class StrainService {
    constructor(@InjectRepository(Strain) private readonly repository: Repository<Strain>) { }

    public async get(id: string): Promise<Strain> {
        return await this.repository.findOne({ where: { id } });
    }

    public async getAll(): Promise<Strain[]> {
        return await this.repository.find();
    }

    public async create(strainDto: StrainDTO): Promise<Strain> {
        return await this.repository.save(strainDto.toEntity());
    }

    public async update(id: string, strainDto: StrainDTO): Promise<Strain> {
        const strain = strainDto.toEntity()
        strain.id = id
        return await this.repository.save(strain);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}