import { BaseDTO } from "./base.dto"
import { PlantDTO } from "./plant.dto"
import { Harvest } from "../../adapters/entities/harvest.entity"

export class HarvestDTO extends BaseDTO {
    observation: string
    plants: PlantDTO[]

    toEntity(): Harvest {
        const harvest = new Harvest()
        harvest.observation = this.observation
        harvest.plants = this.plants.map((plantDto: PlantDTO) => plantDto.toEntity());
        return harvest
    }

    static fromObj(obj: any): HarvestDTO {
        const harvestDto = new HarvestDTO()
        harvestDto.observation = obj.observation
        harvestDto.plants = obj.plants.map((plantObj: any): PlantDTO => PlantDTO.fromObj(plantObj))
        return harvestDto
    }
}