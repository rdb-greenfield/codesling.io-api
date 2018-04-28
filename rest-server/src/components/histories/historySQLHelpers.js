export const addHistoryHelper = `
    INSERT INTO histories
      (outcome, time, clout, user_id, challenger_id, challenge_id)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING
      id, outcome, time, clout, user_id, challenger_id, challenge_id
  `;

export const fetchAllHistoryHelper = `
  SELECT
  histories.id, histories.outcome, histories.time, histories.clout, histories.user_id, histories.challenger_id, histories.challenge_id, users.username
  FROM
    histories, users
  WHERE
    histories.user_id=$1 AND users.id=histories.challenger_id
`;
