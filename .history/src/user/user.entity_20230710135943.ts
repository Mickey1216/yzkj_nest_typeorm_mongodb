import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
imp

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
}