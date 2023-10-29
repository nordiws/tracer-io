import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrainService } from '../services/strain.service';
import { Strain } from '../../adapters/entities/strain.entity';
import { StrainController } from '../controllers/strain.controller';
import { StrainRepository } from '../../adapters/repositories/strain.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Strain, StrainRepository])],
    providers: [StrainService],
    controllers: [StrainController],
})
export class StrainsModule { }