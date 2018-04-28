export const fetchAllUserHelper = `
  SELECT
    id, email, username, password, clout, kdr
  FROM
    users
`;

export const fetchUserHelper = `
  SELECT
    id, email, username, password, clout, kdr
  FROM
    users
  WHERE
    id=$1
`;

export const updateGames = `
  UPDATE users
  SET (clout, wins, games) = (clout + $2, wins + $3, games + 1)
  WHERE id = $1
`;
