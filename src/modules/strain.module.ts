import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrainService } from '../services/strain.service';
import { Strain } from '../entities/strain.entity';
import { StrainController } from '../controllers/strain.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Strain])],
    providers: [StrainService],
    controllers: [StrainController],
})
export class StrainsModule { }