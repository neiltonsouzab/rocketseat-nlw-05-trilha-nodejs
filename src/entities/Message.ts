import { Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import User from './User';

@Entity('messages')
class Message {

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  text: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor () {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default Message;