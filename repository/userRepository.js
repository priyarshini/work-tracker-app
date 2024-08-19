export const usersSelectAll = `SELECT * FROM users`;

export const userSelectById = `SELECT name, email FROM users WHERE id = ? limit 1`;

export const userSelectByEmail = `SELECT * FROM users WHERE email = ?  limit 1`;

export const userInsert = `INSERT INTO users(name, email, hashPassword) VALUES (?,?,?)`;