import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Base } from './base.entity'
import { Plant } from './plant.entity'
import { User } from './user.entity'

@Entity({ name: 'strain' })
export class Strain extends Base {
  @Column({ type: 'varchar', length: 300 })
  origin: string

  @Column({ type: 'varchar', length: 300 })
  genteic_origin: string

  @ManyToOne((type) => Plant, (plant) => plant.strainId)
  plants: Plant[]

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  userId: string;
}
