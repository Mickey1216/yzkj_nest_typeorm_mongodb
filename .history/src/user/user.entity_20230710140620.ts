import { Entity, ObjectIdColumn, ObjectId, Column, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import encry from '../utils/crypto';

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

  @Column({ nullable: true })
  salt: string;

  @BeforeInsert()
  brforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = .encry(this.password, this.salt);
  }
}
