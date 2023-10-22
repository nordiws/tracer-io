import { Repository } from 'typeorm';
import { Strain } from 'src/models/strain.entity'

export interface IStrainRepository extends Repository<Strain> {
    getStrain(id: number): Promise<Strain>
    getStrains(): Promise<Strain[]>
    createStrain(strain: Strain): Promise<Strain>
    updateStrain(strain: Strain): Promise<Strain>
    deleteStrain(id: number): void
}