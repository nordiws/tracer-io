import { ApiTags } from '@nestjs/swagger';
import { StrainDTO } from '../models/strain.dto';
import { StrainService } from '../services/strain.service';
import { Strain } from '../../adapters/entities/strain.entity';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';

interface IStrainController {
    id: string
}

@ApiTags("StrainController")
@Controller("strain")
export class StrainController {
    constructor(private readonly strainService: StrainService) { }

    @Get()
    findAll(): Promise<Strain[]> {
        return this.strainService.getAll();
    }
    @Get(":id")
    findStrain(@Param() params: IStrainController): Promise<Strain> {
        return this.strainService.get(params.id);
    }
    @Post()
    createStrain(@Body() strainDto: StrainDTO): Promise<Strain> {
        return this.strainService.create(strainDto);
    }
    @Post(":id")
    udpateStrain(@Param() params: IStrainController, @Body() strainDto: StrainDTO): Promise<Strain> {
        return this.strainService.update(params.id, strainDto);
    }
    @Delete(":id")
    deleteStrain(@Param() params: IStrainController): Promise<void> {
        return this.strainService.delete(params.id);
    }
}
