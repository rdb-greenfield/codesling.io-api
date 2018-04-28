import { globalController } from "../../lib/components/";
import { msgQuery, fetchMessageQuery } from "./msgQueries";
import { fetchUserQuery } from "../users/userQueries";
import { success, error } from "../../lib/log";

export const msgController = globalController(msgQuery, "msgController");

export const fetchMessagesController = async (req, res) => {
  try {
    const { rows } = await fetchMessageQuery(req.params);
    await rows.forEach(async row => {
      user = await fetchUserQuery(row.receiver_id);
      row.receiver = user;
    });
    return res.status(200).send(rows);
  } catch (err) {
    error("error fetching messages ", err);
  }
};
