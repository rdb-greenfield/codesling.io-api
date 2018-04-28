import { globalController } from "../../lib/components/";
import { historyQuery } from "./historyQueries";

export const historyController = globalController(
  historyQuery,
  "historyController"
);
