import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  qty: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartDetails, { onDelete: "CASCADE" })
  cart: Cart;
}
