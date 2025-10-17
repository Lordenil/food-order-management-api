import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./database/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() as current_time");
    client.release();

    res.json({
      message: "Conexión a la base de datos exitosa",
      currentTime: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    res.status(500).json({
      error: "Error conectando a la base de datos",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express with PostgreSQL!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Database config: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );
});
