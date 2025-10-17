import { AppDataSource } from "../config/data-source";
import { CustomerOrder } from "../customer-order/entity/customer-order.entity";
import { Order } from "./entity/order.entity";

export class OrderService {
  private readonly orderRepository = AppDataSource.getRepository(Order);
  private readonly customerOrderRepository =
    AppDataSource.getRepository(CustomerOrder);

  async getAll() {
    return this.orderRepository.find({
      relations: ["dish", "sauces", "additions", "customerOrder"],
    });
  }

  async getById(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ["dish", "sauces", "additions", "customerOrder"],
    });
  }

  async create(orderData: Partial<Order>, customerOrderId: number) {
    const customerOrder = await this.customerOrderRepository.findOneBy({
      id: customerOrderId,
    });
    if (!customerOrder) throw new Error("Customer order not found");

    const newOrder = this.orderRepository.create({
      ...orderData,
      customerOrder,
    });
    return this.orderRepository.save(newOrder);
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new Error("Order not found");
    return this.orderRepository.remove(order);
  }
}
