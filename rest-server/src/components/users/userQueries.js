import { globalQueryHelper } from "../../lib/components";
import {
  fetchAllUserHelper,
  fetchUserHelper,
  updateGames
} from "./userSQLHelpers";

export const userQuery = async (payload, url, params) => {
  if (url === "/") {
    return await globalQueryHelper(
      payload,
      fetchAllUserHelper,
      "fetchAllUserHelper",
      []
    );
  } else if (url === "/addGame") {
    return await globalQueryHelper(payload, updateGames, "updateGames", [
      "id",
      "clout",
      "wins"
    ]);
  } else {
    return await globalQueryHelper(
      payload,
      fetchUserHelper,
      "fetchUserHelper",
      ["id"]
    );
  }
};
