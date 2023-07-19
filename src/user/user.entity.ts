import { Entity, ObjectIdColumn, ObjectId, Column, BeforeInsert } from 'typeorm';
import { createHash } from 'crypto';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  authCode: string;

  @BeforeInsert()
  brforeInsert() {
    this.password = createHash('sha256').update(this.password).digest('hex');
  }
}
