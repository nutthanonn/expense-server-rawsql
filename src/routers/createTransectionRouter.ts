import express, { Request, Response } from "express";
import { client } from "../config/db";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/api/transection", async (req: Request, res: Response) => {
  const { title, transection_type, amount, card_id } = req.body;

  if (card_id === null) {
    return res.json({ message: "card number is required" });
  }

  const balance = await client.query("select balance from card");

  if (balance.rows[0].balance - amount < 0 && transection_type === "withdraw") {
    return res.json({ data: null, message: "error not enough money" });
  }

  const cardData = await client.query(
    "update card set balance=balance+$1 where card_number=$2 returning *",
    [amount, card_id]
  );

  const data = await client.query(
    "insert into transection values($1,$2,$3,$4,$5,$6) returning *",
    [
      uuidv4(),
      title,
      transection_type,
      new Date().toUTCString(),
      amount,
      card_id,
    ]
  );

  res
    .status(200)
    .json({ data: data.rows, message: "success", card: cardData.rows });
});

export { router as createTransectionRouter };
