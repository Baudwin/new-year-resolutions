import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Resolution } from 'src/resolution/entities/resolution.entity';

@Entity('ai_responses')
export class AiResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Resolution, (resolution) => resolution.aiResponse, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resolution_id' })
  resolution: Resolution;

  @Column()
  model: string;

  @Column('text')
  responseText: string;

  @CreateDateColumn()
  createdAt: Date;
}
