import { Repository } from 'typeorm';
import { Strain } from 'src/adapters/entities/strain.entity'

export interface IStrainRepository extends Repository<Strain> {
    getStrain(id: string): Promise<Strain>
    getStrains(): Promise<Strain[]>
    createStrain(strain: Strain): Promise<Strain>
    updateStrain(strain: Strain): Promise<Strain>
    deleteStrain(id: string): void
}