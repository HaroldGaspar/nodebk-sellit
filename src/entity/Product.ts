import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { Review } from "./Review";
import { Store } from "./Store";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mark: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ update: false })
  stock: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  rating: number;

  @Column()
  photo: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category: Category;

  @ManyToOne(() => Store, (store) => store.products, { onDelete: "CASCADE" })
  store: Store;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
