import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity()
@Unique(["name"])
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "" })
  address: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })
  phoneNumber: string;

  @OneToMany(() => Product, (product) => product.store, { onDelete: "CASCADE" })
  products: Product[];

  @OneToOne(() => Customer, (customer) => customer.store, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  customer: Customer;
}
