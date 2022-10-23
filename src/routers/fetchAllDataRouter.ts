import express, { Request, Response } from "express";
import { client } from "../config/db";
import { HttpStatus } from "../config/httpStatus";

const router = express.Router();

async function getTransection(id: string) {
  return await client.query("SELECT * FROM transection where card_id = $1", [
    id,
  ]);
}

router.get("/api/card/all", async (req: Request, res: Response) => {
  const data: any = [];

  try {
    const cardData = await client.query("select * from card");

    for (let i = 0; i < cardData.rows.length; i++) {
      const transectionData = await getTransection(
        cardData.rows[i].card_number
      );
      await data.push({
        card: cardData.rows[i],
        transection: transectionData.rows,
      });
    }
    return res.status(HttpStatus.OK).json({ message: "success", data });
  } catch (error: any) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.detail });
  }
});

export { router as fetchAllDataRouter };
