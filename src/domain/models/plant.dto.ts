import { BaseDTO } from "./base.dto"
import { StrainDTO } from "./strain.dto"
import { HarvestDTO } from "./harvest.dto"
import { Plant } from "../../adapters/entities/plant.entity"
import { Strain } from "../../adapters/entities/strain.entity"
import { Harvest } from "../../adapters/entities/harvest.entity"


export class PlantDTO extends BaseDTO {
    date_planted: Date
    flower_period: Date
    date_harvest: Date
    date_stored: Date
    plants_qty: number
    genetic_origin: string
    strainId: string
    harvestId: string

    toEntity(): Plant {
        const plant = new Plant();
        plant.date_planted = this.date_planted;
        plant.flower_period = this.flower_period;
        plant.date_harvest = this.date_harvest;
        plant.date_stored = this.date_stored;
        plant.plants_qty = this.plants_qty;
        plant.genetic_origin = this.genetic_origin;
        plant.strainId = this.strainId
        plant.harvestId = this.harvestId

        return plant;
    }

    static fromObj(obj: any): PlantDTO {
        const plantDto = new PlantDTO();
        plantDto.date_planted = new Date(obj.date_planted);
        plantDto.flower_period = new Date(obj.flower_period);
        plantDto.date_harvest = new Date(obj.date_harvest);
        plantDto.date_stored = new Date(obj.date_stored);
        plantDto.plants_qty = obj.plants_qty;
        plantDto.genetic_origin = obj.genetic_origin;
        plantDto.strainId = obj.strainId;
        plantDto.harvestId = obj.harvestId;
        return plantDto;
    }
}
