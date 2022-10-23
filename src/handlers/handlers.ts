import { createCardRouter } from "../routers/createCardRouter";
import { fetchCardRouter } from "../routers/fetchCardRouter";
import { createTransectionRouter } from "../routers/createTransectionRouter";
import { fetchAllDataRouter } from "../routers/fetchAllDataRouter";
import { deleteCardRouter } from "../routers/deleteCardRouter";
import { fetchTransectionByIdRouter } from "../routers/fetchTransectionByIdRouter";

export const handlers = {
  createCardRouter,
  fetchCardRouter,
  createTransectionRouter,
  fetchAllDataRouter,
  deleteCardRouter,
  fetchTransectionByIdRouter,
};
