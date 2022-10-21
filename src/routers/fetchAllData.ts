import express, { Request, Response } from "express";
import { client } from "../config/db";

const router = express.Router();

async function getTransection(id: string) {
  return await client.query("SELECT * FROM transection where card_id = $1", [
    id,
  ]);
}

router.get("/api/card/all", async (req: Request, res: Response) => {
  const data: any = [];

  const cardData = await client.query("select * from card");

  for (let i = 0; i < cardData.rows.length; i++) {
    const transectionData = await getTransection(cardData.rows[i].card_number);
    await data.push({
      card: cardData.rows[i],
      transection: transectionData.rows,
    });
  }

  res.json(data);
});

export { router as fetchAllDataRouter };
