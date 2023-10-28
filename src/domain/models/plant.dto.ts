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
    strain: Array<StrainDTO>
    harvest: Array<HarvestDTO>

    toEntity(): Plant {
        const plant = new Plant();

        plant.date_planted = this.date_planted;
        plant.flower_period = this.flower_period;
        plant.date_harvest = this.date_harvest;
        plant.date_stored = this.date_stored;
        plant.plants_qty = this.plants_qty;
        plant.genetic_origin = this.genetic_origin;

        plant.strain = this.strain.map((strainDTO: StrainDTO) => {
            const strain = new Strain();
            // Assign property values from the StrainDTO object to the Strain entity object
            return strain;
        });

        // Map HarvestDTO array to Harvest entity array
        plant.harvest = this.harvest.map((harvestDTO: HarvestDTO) => {
            const harvest = new Harvest();
            // Assign property values from the HarvestDTO object to the Harvest entity object
            return harvest;
        });

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

        plantDto.strain = obj.strain.map((strain: any) => {
            const strainDto = new StrainDTO();
            // Assign property values from the obj object to the StrainDTO object
            return strainDto;
        });

        plantDto.harvest = obj.harvest.map((harvest: any) => {
            const harvestDto = new HarvestDTO();
            // Assign property values from the obj object to the HarvestDTO object
            return harvestDto;
        });

        return plantDto;
    }
}
