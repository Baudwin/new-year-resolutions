import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Resolution } from 'src/resolution/entities/resolution.entity';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  text: string | null;

  @ManyToOne(() => Resolution, { onDelete: 'CASCADE' })
  resolution: Resolution;

  @ManyToOne(() => AnonymousUser, { onDelete: 'CASCADE' })
  anonymousUser: AnonymousUser;

  @CreateDateColumn()
  createdAt: Date;
}
