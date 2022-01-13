import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer";

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: "" })
  resetPasswordToken: string;

  @Column({ default: "" })
  confimationToken: string;

  @Column({ default: 0 })
  confirmed: boolean;

  @Column({ default: 0 })
  verified: boolean;

  @OneToOne(() => Customer, { onDelete: "CASCADE", eager: true })
  @JoinColumn()
  customer: Customer;
}
