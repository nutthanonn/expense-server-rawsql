import express, { Request, Response } from "express";
import { client } from "../config/db";

const router = express.Router();

router.get("/api/card", async (req: Request, res: Response) => {
  const data = await client.query("select * from card");

  res.status(200).json({ data: data.rows });
});

export { router as fetchCardRouter };
