import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email: string;

  @Column("text")
  username: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;
}