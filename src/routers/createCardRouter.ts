import express, { Request, Response } from "express";
import { client } from "../config/db";

const router = express.Router();

router.post("/api/card", async (req: Request, res: Response) => {
  const { card_number, balance } = req.body;

  const data = await client.query(
    "insert into card values($1, $2) returning *",
    [card_number, balance]
  );

  res.status(200).json({ message: "success", data: data.rows });
});

export { router as createCardRouter };
