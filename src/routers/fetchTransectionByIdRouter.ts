import express, { Request, Response } from "express";
import { client } from "../config/db";
import { HttpStatus } from "../config/httpStatus";

const router = express.Router();

router.get("/api/transection/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      "SELECT * FROM transection WHERE card_id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      return res
        .status(HttpStatus.OK)
        .json({ message: "success", card_id: id, transection: result.rows });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json();
    }
  } catch (error: any) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.detail });
  }
});

export { router as fetchTransectionByIdRouter };
