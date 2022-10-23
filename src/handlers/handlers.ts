import { createCardRouter } from "../routers/createCardRouter";
import { fetchCardRouter } from "../routers/fetchCardRouter";
import { createTransectionRouter } from "../routers/createTransectionRouter";
import { fetchAllDataRouter } from "../routers/fetchAllDataRouter";
import { deleteCardRouter } from "../routers/deleteCardRouter";
import { fetchTransectionByIdRouter } from "../routers/fetchTransectionByIdRouter";
import { IRouter } from "express";

interface Handler {
  [key: string]: IRouter;
}

export const handlers: Handler = {
  createCardRouter,
  fetchCardRouter,
  createTransectionRouter,
  fetchAllDataRouter,
  deleteCardRouter,
  fetchTransectionByIdRouter,
};
