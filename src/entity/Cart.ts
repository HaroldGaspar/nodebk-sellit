import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CartDetail } from "./CartDetail";
import { Customer } from "./Customer";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  totalPrice: number;

  @ManyToOne(() => Customer, (customer) => customer.carts, {
    onDelete: "CASCADE",
  })
  customer: Customer;

  @Column({ default: true })
  isActual: boolean;

  @Column({ default: "" })
  transaction: string;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.cart)
  cartDetails: CartDetail[];
}
