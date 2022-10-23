import express from "express";
import { client } from "./config/db";
import { sqlShema } from "./config/createShema";
import { handlers } from "./handlers/handlers";

const app = express();
// app.use(cors);
app.use(express.json());

async function main() {
  try {
    await client.connect();
    client.query(sqlShema);
    app.use(handlers.createCardRouter);
    app.use(handlers.fetchCardRouter);
    app.use(handlers.createTransectionRouter);
    app.use(handlers.fetchAllDataRouter);
    app.use(handlers.deleteCardRouter);
    app.use(handlers.fetchTransectionByIdRouter);

    app.listen(8000, () => {
      console.log("Connect Success full");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
