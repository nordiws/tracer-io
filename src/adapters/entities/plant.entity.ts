import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Base } from './base.entity'
import { Strain } from './strain.entity'
import { Harvest } from './harvest.entity'

@Entity({ name: 'plant' })
export class Plant extends Base {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date_planted: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  flower_period: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date_harvest: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date_stored: Date

  @Column({ type: 'integer' })
  plants_qty: number

  @Column({ type: 'varchar', length: 300 })
  genetic_origin: string

  @ManyToOne(() => Strain, (strain) => strain.id)
  @JoinColumn({ name: "strain_id" })
  strainId: string;

  @ManyToOne(() => Harvest, (harvest) => harvest.id)
  @JoinColumn({ name: "harvest_id" })
  harvestId: string;
}
