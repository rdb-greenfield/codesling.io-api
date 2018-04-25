import { globalQueryHelper } from "../../lib/components/";
import {
  addTestCaseHelper,
  fetchAllTestCasesHelper
} from "./testCasesSQLHelpers";

export const testCaseQuery = async (payload, url) => {
  if (url === "/") {
    return await globalQueryHelper(
      payload,
      addTestCaseHelper,
      "addTestCaseHelper",
      ["tests", "challenge_id"]
    );
  } else {
    return await globalQueryHelper(
      payload,
      fetchAllTestCasesHelper,
      "fetchAllTestCasesHelper"
    );
  }
};
