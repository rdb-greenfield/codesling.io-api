export const addTestCaseHelper = `
  INSERT INTO 
    testCases (tests, challenge_id)
  VALUES 
    ($1, $2)
  RETURNING
    id, tests, challenge_id
`;

// throw this shit into the challenge fetfch
export const fetchAllTestCasesHelper = ({ challenge_id }) => {
  return `
    SELECT
      id, tests, challenge_id
    FROM
      testCases
    WHERE
      challenge_id=${challenge_id}
  `;
};
