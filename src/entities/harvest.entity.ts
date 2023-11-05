import { Base } from './base.entity'
import { User } from './user.entity'
import { Plant } from './plant.entity'
import { Entity, Column, OneToMany, JoinColumn } from 'typeorm'

@Entity({ name: 'harvest' })
export class Harvest extends Base {

  @Column({ type: 'varchar', length: 2000 })
  observation: string

  @OneToMany((type) => Plant, (plant) => plant.harvestId)
  plants: Plant[]

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  userId: string;
}
