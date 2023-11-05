import { BaseDTO } from "./base.dto"
import { PlantDTO } from "./plant.dto"
import { StrainDTO } from "./strain.dto"
import { HarvestDTO } from "./harvest.dto"
import { User } from "../entities/User.entity"

export class UserDTO extends BaseDTO {
    authProvider: string
    email: string
    phone: string
    plants: PlantDTO[]
    harvests: HarvestDTO[]
    strains: StrainDTO[]

    toEntity(): User {
        const user = new User()
        user.authProvider = this.authProvider
        user.email = this.email
        user.phone = this.phone
        user.plants = this.plants.map((plantDto: PlantDTO) => plantDto.toEntity());
        user.harvests = this.harvests.map((harvestDto: HarvestDTO) => harvestDto.toEntity());
        user.strains = this.strains.map((strainDto: StrainDTO) => strainDto.toEntity());
        return user
    }

    static fromObj(obj: any): UserDTO {
        const userDto = new UserDTO()
        userDto.authProvider = obj.authProvider
        userDto.email = obj.email
        userDto.phone = obj.phone
        userDto.plants = obj.plants.map((plantObj: any): PlantDTO => PlantDTO.fromObj(plantObj))
        userDto.harvests = obj.harvests.map((harvestObj: any): HarvestDTO => HarvestDTO.fromObj(harvestObj))
        userDto.strains = obj.strains.map((strainObj: any): StrainDTO => StrainDTO.fromObj(strainObj))
        return userDto
    }
}