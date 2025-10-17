import express from "express";
import cors from "cors";
import orderRoutes from "./order/order.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "API de Gestion de Pedidos de Comida" });
});

export default app;
