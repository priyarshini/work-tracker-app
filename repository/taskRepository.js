export const taskSelectAll = `SELECT * FROM tasks`;

export const taskSelectById = `SELECT * FROM tasks where id = ?`;

export const taskInsert = `INSERT INTO tasks(title, description, userId) VALUES (?,?,?)`;

export const taskUpdate = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;

export const taskDelete = `DELETE FROM tasks WHERE id =?`;
