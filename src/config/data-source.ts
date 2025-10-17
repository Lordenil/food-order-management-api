import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Addition } from "../addition/entity/addition.entity";
import { Dish } from "../dish/entity/dish.entity";
import { Sauce } from "../sauce/entity/sauce.entity";
import { Order } from "../order/entity/order.entity";
import { CustomerOrder } from "../customer-order/entity/customer-order.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: false,
  entities: [Addition, Dish, Sauce, Order, CustomerOrder],
  migrations: ["src/migrations/*.ts"],
});
