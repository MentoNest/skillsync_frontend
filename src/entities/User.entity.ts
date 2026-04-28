import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { UserStatus } from '@/types/enums';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({ name: 'is_admin', default: false })
  isAdmin!: boolean;

  @Column({ unique: true, nullable: true, length: 30 })
  username?: string;

  @Column({ name: 'display_name', nullable: true, length: 50 })
  displayName?: string;

  @Column({ name: 'username_changed_at', nullable: true })
  usernameChangedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @BeforeInsert()
  setDefaults() {
    this.id = uuidv4();
    if (!this.displayName) {
      this.displayName = this.generateDefaultDisplayName();
    }
  }

  private generateDefaultDisplayName(): string {
    if (this.email) {
      return this.email.split('@')[0];
    }
    return 'User';
  }
}
