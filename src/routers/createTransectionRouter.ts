import express, { Request, Response } from "express";
import { client } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { HttpStatus } from "../config/httpStatus";

const router = express.Router();

router.post("/api/transection", async (req: Request, res: Response) => {
  const { title, transection_type, amount, card_id } = req.body;

  if (card_id === "" || title === "" || transection_type === "") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "card_id, title, transection_type is required" });
  }

  try {
    const balance = await client.query("select balance from card");

    if (
      balance.rows[0].balance - amount < 0 &&
      transection_type === "withdraw"
    ) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "error not enough money", transection: null });
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
        new Date().toLocaleString(),
        amount,
        card_id,
      ]
    );
    return res.status(HttpStatus.CREATED).json({
      message: "success",
      card: cardData.rows[0],
      transection: data.rows[0],
    });
  } catch (error: any) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.detail });
  }
});

export { router as createTransectionRouter };
