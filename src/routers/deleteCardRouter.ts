import express, { Request, Response } from "express";
import { client } from "../config/db";
import { HttpStatus } from "../config/httpStatus";

const router = express.Router();

router.delete("/api/card/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === "") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "id is required" });
  }

  try {
    const data = await client.query(
      "delete from card where card_number=$1 returning *",
      [id]
    );

    if (data.rows.length > 0) {
      return res
        .status(HttpStatus.ACCEPTED)
        .json({ message: "delete success", card: data.rows[0] });
    } else {
      return res.status(HttpStatus.NO_CONTENT).json();
    }
  } catch (error: any) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.detail });
  }
});

export { router as deleteCardRouter };
