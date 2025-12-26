import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';

@Entity('usage_limits')
export class UsageLimit {
  @PrimaryColumn('uuid', { name: 'anonymous_user_id' })
  anonymousUserId: string;

  @PrimaryColumn({ type: 'date' })
  date: string;

  @Column({ default: 0 })
  aiRequestsCount: number;

  @ManyToOne(() => AnonymousUser, (user) => user.usageLimits, {
    onDelete: 'CASCADE',
  })
  anonymousUser: AnonymousUser;
}
