// src/entities/Addition.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "../../order/entity/order.entity";

@Entity()
export class Addition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @ManyToOne(() => Order, (order) => order.additions)
  order!: Order;
}
