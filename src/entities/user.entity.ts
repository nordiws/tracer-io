import { Base } from './base.entity'
import { Plant } from './plant.entity'
import { Strain } from './strain.entity'
import { Harvest } from './harvest.entity'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity({ name: 'user' })
export class User extends Base {

    @Column({ type: 'varchar', length: 2000 })
    authProvider: string

    @Column({ type: 'varchar', length: 2000 })
    email: string

    @Column({ type: 'varchar', length: 2000 })
    phone: string

    @OneToMany((type) => Plant, (plant) => plant.id)
    plants: Plant[]

    @OneToMany((type) => Harvest, (harvest) => harvest.id)
    harvests: Harvest[]

    @OneToMany((type) => Strain, (strain) => strain.id)
    strains: Strain[]
}
