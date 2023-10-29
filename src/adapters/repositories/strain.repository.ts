import { EntityNotFoundError } from "typeorm";
import { Strain } from "src/adapters/entities/strain.entity";
import { Repository } from "typeorm/repository/Repository";
import { IStrainRepository } from "src/adapters/interfaces/strain.interface";

export class StrainRepository extends Repository<Strain> implements IStrainRepository {

    async getStrain(id: string): Promise<Strain> {
        return this.findOne({ where: { id: id } });
    }

    async getStrains(): Promise<Strain[]> {
        return this.find();
    }

    async createStrain(strain: Strain): Promise<Strain> {
        return this.save(strain);
    }

    async updateStrain(strain: Strain): Promise<Strain> {
        const foundStrain = await this.findOne({ where: { id: strain.id } })
        if (foundStrain) {
            await this.update(strain.id, strain);
            return strain;
        } else {
            throw new EntityNotFoundError('StrainRepository', strain.id);
        }
    }

    async deleteStrain(id: string): Promise<void> {
        await this.delete(id);
    }
}