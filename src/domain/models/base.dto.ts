import { Base } from "../../adapters/entities/base.entity"

export class BaseDTO {
    name: string
    description: string
    active?: boolean = false
    created: Date
    updated: Date

    toEntity(): Base {
        const base = new Base()
        base.name = this.name
        base.description = this.description
        base.active = this.active
        base.created = this.created
        base.updated = this.updated
        return base
    }

    static fromObj(obj: any): BaseDTO {
        const baseDto = new BaseDTO()
        baseDto.name = obj.name
        baseDto.description = obj.description
        baseDto.active = obj.active
        baseDto.created = new Date(obj.created)
        baseDto.updated = new Date(obj.updated)
        return baseDto
    }
}
