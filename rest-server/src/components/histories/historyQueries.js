import { globalQueryHelper } from "../../lib/components/";
import { addHistoryHelper, fetchAllHistoryHelper } from "./historySQLHelpers";

export const historyQuery = async (payload, url) => {
  if (url === "/addHistory") {
    const data = await globalQueryHelper(
      payload,
      addHistoryHelper,
      "addHistoryHelper",
      ["outcome", "time", "clout", "user_id", "challenger_id", "challenge_id"]
    );
    return data;
  } else {
    return await globalQueryHelper(
      payload,
      fetchAllHistoryHelper,
      "fetchAllHistoryHelper",
      ["user_id"]
    );
  }
};
