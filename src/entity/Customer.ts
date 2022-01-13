import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Cart } from "./Cart";
import { Review } from "./Review";
import { Store } from "./Store";
import { User } from "./User";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isSeller: boolean;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToOne(() => Store, { onDelete: "CASCADE", eager: true })
  @JoinColumn()
  store: Store;

  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];

  //require for insert actual cart to token, while signin
  @OneToMany(() => Cart, (review) => review.customer, { eager: true })
  carts: Cart[];
}
