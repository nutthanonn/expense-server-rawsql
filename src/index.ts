import express from "express";
import cors from "cors";
import { client } from "./config/db";
import { sqlShema } from "./config/createShema";
import { createCardRouter } from "./routers/createCardRouter";
import { fetchCardRouter } from "./routers/fetchCardRouter";
import { createTransectionRouter } from "./routers/createTransectionRouter";
import { fetchAllDataRouter } from "./routers/fetchAllDataRouter";
import { deleteCardRouter } from "./routers/deleteCardRouter";
import { fetchTransectionByIdRouter } from "./routers/fetchTransectionByIdRouter";

const app = express();
// app.use(cors);
app.use(express.json());

async function main() {
  try {
    await client.connect();
    client.query(sqlShema);
    app.use(createCardRouter);
    app.use(fetchCardRouter);
    app.use(createTransectionRouter);
    app.use(fetchAllDataRouter);
    app.use(deleteCardRouter);
    app.use(fetchTransectionByIdRouter);

    app.listen(8000, () => {
      console.log("Connect Success full");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
