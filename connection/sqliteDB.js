import sqlite3 from 'sqlite3';

const sql = sqlite3.verbose();

const db = new sql.Database("./database/workTracker.db",(err)=>{
    if (err) console.error('Error opening database:', err.message);
    else console.log('Connected to the SQLite database');
});

export default db;
