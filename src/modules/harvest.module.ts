import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestService } from '../services/harvest.service';
import { Harvest } from '../entities/harvest.entity';
import { HarvestController } from '../controllers/harvest.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Harvest])],
    providers: [HarvestService],
    controllers: [HarvestController],
})
export class HarvestsModule { }