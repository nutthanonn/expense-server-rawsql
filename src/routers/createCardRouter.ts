import express, { Request, Response } from "express";
import { client } from "../config/db";

const router = express.Router();

router.post("/api/card", async (req: Request, res: Response) => {
  const { card_number, balance } = req.body;

  try {
    const data = await client.query(
      "insert into card values($1, $2) returning *",
      [card_number, balance]
    );
    res.status(200).json({ message: "success", data: data.rows });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as createCardRouter };
