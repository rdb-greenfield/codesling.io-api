import { globalQueryHelper } from "../../lib/components/";
import {
  fetchAllMessagesForUserHelper,
  saveMessageHelper
} from "./msgSQLHelpers";
import { success, error } from "../../lib/log";

export const msgQuery = async (payload, url) => {
  console.log("query", url);
  if (url === "/") {
    return await globalQueryHelper(
      payload,
      saveMessageHelper,
      "saveMessageQuery",
      ["sender_id", "receiver_id", "content"]
    );
  }
};

export const fetchMessageQuery = async payload => {
  try {
    const queryString = fetchAllMessagesForUserHelper(payload);
    const data = await db.query(queryString);
    success("successfully fetched all the messages");
    return data;
  } catch (err) {
    error("error fetching the messages. err= ", err);
  }
};
