import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  AfterInsert,
  getRepository,
} from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  stars: number;

  @Column()
  username: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.reviews, {
    onDelete: "CASCADE",
  })
  customer: Customer;
}
