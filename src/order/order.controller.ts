import { Request, Response } from "express";
import { OrderService } from "./order.service";

const orderService = new OrderService();

export class OrderController {
  static async getAll(req: Request, res: Response) {
    try {
      const orders = await orderService.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const order = await orderService.getById(Number(req.params.id));
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { customerOrderId, ...orderData } = req.body;
      const order = await orderService.create(orderData, customerOrderId);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await orderService.delete(Number(req.params.id));
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
