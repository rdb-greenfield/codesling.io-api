export const signUpHelper = `
    INSERT INTO
      users (email, username, password, clout, wins, games, kdr)
    VALUES
      ($1, $2, $3, 0, 0, 0, 0)
    RETURNING
      id, email
`;

export const loginHelper = `
    SELECT
      id, email, username, password, clout, kdr
    FROM
      users
    WHERE
      email=$1
`;
