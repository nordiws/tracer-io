import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestService } from '../services/harvest.service';
import { Harvest } from '../../adapters/entities/harvest.entity';
import { HarvestController } from '../controllers/harvest.controller';
import { HarvestRepository } from '../../adapters/repositories/harvest.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Harvest, HarvestRepository])],
    providers: [HarvestService],
    controllers: [HarvestController],
})
export class HarvestsModule { }