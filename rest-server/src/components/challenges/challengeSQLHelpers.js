export const addChallengeHelper = `
  INSERT INTO 
    challenges (title, content, difficulty, rating, fn_name)
  VALUES 
    ($1, $2, $3, 0, $4)
  RETURNING 
    id, title, content, difficulty, fn_name
`;

export const fetchChallengeHelper = `
  SELECT
    c.id, c.title, c.content, c.difficulty, c.rating, c.fn_name, tc.tests, tc.challenge_id
  FROM
    challenges AS c
  FULL OUTER JOIN
    testCases AS tc
  ON
    (c.id=tc.challenge_id)
`;
