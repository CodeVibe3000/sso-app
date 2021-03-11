import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity("verifications")
export class VerificationRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  userEmail: string

  @Column("text")
  appName: string

  @Column("text")
  dateTime: string

  @Column({ default: false })
  verified: Boolean
}
