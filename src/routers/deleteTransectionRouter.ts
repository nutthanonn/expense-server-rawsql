import { client } from "./../config/db";
import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/api/transection/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await client.query(
    "delete from transection where transection_id=$1 returning *",
    [id]
  );
  res.json({ message: "delete success", data: data.rows });
});

export { router as deleteTransectionRouter };
