import { Entity, ObjectIdColumn, ObjectId, Column, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { ToolsService } from 'src/utils/tools.service';

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
    this.salt = crypto.randomBytes(4).toString('base64');
    
  }
}
