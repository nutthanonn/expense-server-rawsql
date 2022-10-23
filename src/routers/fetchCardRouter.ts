import express, { Request, Response } from "express";
import { client } from "../config/db";

const router = express.Router();

router.get("/api/card", async (req: Request, res: Response) => {
  try {
    const data = await client.query("select * from card");
    res.status(200).json({ data: data.rows });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as fetchCardRouter };
