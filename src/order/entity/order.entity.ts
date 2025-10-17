import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { CustomerOrder } from "../../customer-order/entity/customer-order.entity";
import { Dish } from "../../dish/entity/dish.entity";
import { Sauce } from "../../sauce/entity/sauce.entity";
import { Addition } from "../../addition/entity/addition.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => CustomerOrder, (customerOrder) => customerOrder.orders)
  customerOrder!: CustomerOrder;

  @OneToOne(() => Dish, { cascade: true })
  @JoinColumn()
  dish!: Dish;

  @OneToMany(() => Sauce, (sauce) => sauce.order, { cascade: true })
  sauces!: Sauce[];

  @OneToMany(() => Addition, (addition) => addition.order, { cascade: true })
  additions!: Addition[];
}
