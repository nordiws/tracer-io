import { ApiTags } from '@nestjs/swagger';
import { HarvestDTO } from '../models/harvest.dto';
import { HarvestService } from '../services/harvest.service';
import { Harvest } from 'src/entities/harvest.entity';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';

interface IHarvestController {
    id: string
}

@ApiTags("HarvestController")
@Controller("harvest")
export class HarvestController {
    constructor(private readonly harvestService: HarvestService) { }

    @Get()
    findAll(): Promise<Harvest[]> {
        return this.harvestService.getAll();
    }
    @Get(":id")
    findHarvest(@Param() params: IHarvestController): Promise<Harvest> {
        return this.harvestService.get(params.id);
    }
    @Post()
    createHarvest(@Body() harvestDto: HarvestDTO): Promise<Harvest> {
        return this.harvestService.create(harvestDto);
    }
    @Post(":id")
    udpateHarvest(@Param() params: IHarvestController, @Body() harvestDto: HarvestDTO): Promise<Harvest> {
        return this.harvestService.update(params.id, harvestDto);
    }
    @Delete(":id")
    deleteHarvest(@Param() params: IHarvestController): Promise<void> {
        return this.harvestService.delete(params.id);
    }
}
