import express, { Request, Response } from "express";
import { client } from "../config/db";
import { HttpStatus } from "../config/httpStatus";

const router = express.Router();

router.post("/api/card", async (req: Request, res: Response) => {
  const { card_number, balance } = req.body;

  if (card_number === "" || card_number.length !== 19) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "card number is not correct" });
  }

  try {
    const data = await client.query(
      "insert into card values($1, $2) returning *",
      [card_number, balance]
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: "success", card: data.rows[0] });
  } catch (error: any) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.detail });
  }
});

export { router as createCardRouter };
