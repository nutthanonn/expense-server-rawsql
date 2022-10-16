import express, { Request, Response } from "express";
import { client } from "../config/db";

const router = express.Router();

router.get("/api/transection", async (req: Request, res: Response) => {
  const data = await client.query("select * from transection");

  res.status(200).json({ data: data.rows });
});

export { router as fetchTransectionRouter };
