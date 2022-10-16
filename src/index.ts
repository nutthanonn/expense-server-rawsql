import express from "express";
import { client } from "./config/db";
import { sqlShema } from "./config/createShema";
import { createCardRouter } from "./routers/createCardRouter";
import { fetchCardRouter } from "./routers/fetchCardRouter";
import { fetchTransectionRouter } from "./routers/fetchTransectionRouter";
import { createTransectionRouter } from "./routers/createTransectionRouter";
import { deleteTransectionRouter } from "./routers/deleteTransectionRouter";

const app = express();
app.use(express.json());

async function main() {
  try {
    await client.connect();
    client.query(sqlShema);
    app.use(createCardRouter);
    app.use(fetchCardRouter);
    app.use(fetchTransectionRouter);
    app.use(createTransectionRouter);
    app.use(deleteTransectionRouter);

    app.listen(8000, () => {
      console.log("Connect Success full");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
