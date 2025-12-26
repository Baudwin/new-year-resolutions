import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';
import { AiResponse } from 'src/ai-response/entities/ai-response.entity';

@Entity('resolutions')
export class Resolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AnonymousUser, (user) => user.resolutions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'anonymous_user_id' })
  anonymousUser: AnonymousUser;

  @Column('text')
  text: string;

  @Column({ type: 'varchar', nullable: true })
  category?: string;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => AiResponse, (aiResponse) => aiResponse.resolution)
  aiResponse: AiResponse;
}
