import { Entity, Column, OneToMany } from 'typeorm'
import { Base } from './base.entity'
import { Plant } from './plant.entity'

@Entity({ name: 'harvest' })
export class Harvest extends Base {

  @Column({ type: 'varchar', length: 2000 })
  observation: string

  @OneToMany((type) => Plant, (plant) => plant.harvestId)
  plants: Plant[]
}
