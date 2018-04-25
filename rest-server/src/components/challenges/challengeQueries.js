import { globalQueryHelper } from "../../lib/components/";
import {
  addChallengeHelper,
  fetchChallengeHelper
} from "./challengeSQLHelpers";

export const challengeQuery = async (payload, url) => {
  if (url === "/addChallenge") {
    return await globalQueryHelper(
      payload,
      addChallengeHelper,
      "addChallengeHelper",
      ["title", "content", "difficulty", "fn_name"]
    );
  } else {
    return await globalQueryHelper(
      payload,
      fetchChallengeHelper,
      "fetchChallengeHelper"
    );
  }
};

// try {
//   const query = {
//     text: queryString,
//     values: queryPayloadOrganizer(payload, columns),
//     // rowMode: 'array'
//   };
//   await db.query('BEGIN');
//   const data = await db.query(query);
//   const moreData = await db.query(userChallengeQuery)
//   await db.query('COMMIT');

// } catch (err) {
//   error(`${name} - error= ', ${err}`);
//   throw new Error(err);
// }
