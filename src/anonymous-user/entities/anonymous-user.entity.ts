import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Resolution } from 'src/resolution/entities/resolution.entity';
import { UsageLimit } from 'src/usage-limit/entities/usage-limit.entity';


@Entity('anonymous_users')
export class AnonymousUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Resolution, (resolution) => resolution.anonymousUser)
  resolutions: Resolution[];

  @OneToMany(() => UsageLimit, (usageLimit) => usageLimit.anonymousUser)
  usageLimits: UsageLimit[];
}
