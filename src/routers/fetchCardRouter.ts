import express, { Request, Response } from "express";
import { client } from "../config/db";
import { HttpStatus } from "../config/httpStatus";

const router = express.Router();

router.get("/api/card", async (req: Request, res: Response) => {
  try {
    const data = await client.query("select * from card");
    if (data.rows.length > 0) {
      return res
        .status(HttpStatus.OK)
        .json({ message: "success", card: data.rows });
    } else {
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: "no content", card: [] });
    }
  } catch (error: any) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.detail });
  }
});

export { router as fetchCardRouter };
