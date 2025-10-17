// src/entities/Sauce.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "../../order/entity/order.entity";

@Entity()
export class Sauce {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Order, (order) => order.sauces)
  order!: Order;
}
