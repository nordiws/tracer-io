import { Entity, Column, ManyToOne } from 'typeorm'
import { Base } from './base.entity'
import { Plant } from './plant.entity'

@Entity({ name: 'harvest' })
export class Harvest extends Base {

    @Column({ type: 'varchar', length: 2000 })
  observation: string

  @ManyToOne((type) => Plant, (plant) => plant)
  plant: Plant[]
}
