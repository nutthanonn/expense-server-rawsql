import { client } from "./../config/db";
import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/api/transection/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === "") {
    return res.json({ message: "id is required" });
  }

  try {
    const data = await client.query(
      "delete from transection where transection_id=$1 returning *",
      [id]
    );
    return res.json({ message: "delete success", data: data.rows });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as deleteTransectionRouter };
