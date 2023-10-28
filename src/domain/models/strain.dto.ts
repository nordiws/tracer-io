import { BaseDTO } from "./base.dto"
import { PlantDTO } from "./plant.dto"
import { Strain } from "../../adapters/entities/strain.entity"


export class StrainDTO extends BaseDTO {
    origin: string
    genteic_origin: string
    plants: PlantDTO[]

    toEntity(): Strain {
        const harvest = new Strain()
        harvest.origin = this.origin
        harvest.genteic_origin = this.genteic_origin
        harvest.plants = this.plants.map((plantDto: PlantDTO) => plantDto.toEntity());
        return harvest
    }

    static fromObj(obj: any): StrainDTO {
        const harvestDto = new StrainDTO()
        harvestDto.origin = obj.origin
        harvestDto.genteic_origin = obj.genteic_origin
        harvestDto.plants = obj.plants.map((plantObj: any): PlantDTO => PlantDTO.fromObj(plantObj))
        return harvestDto
    }
}