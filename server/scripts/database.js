const sqlite3 = require('sqlite3').verbose();

function checkTableExists(database, table_name) {
  let conn = new sqlite3.Database(database);
  let query = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;

  return new Promise((resolve, reject) => {
    conn.get(query, [table_name], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row !== null);
      }
      conn.close();
    });
  });
}

// unsafe
function createTable(database_name, table_name) {
  let conn = new sqlite3.Database(database_name);
  let query = `CREATE TABLE IF NOT EXISTS ${table_name} (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT, question TEXT, answer TEXT)`;

  return new Promise((resolve, reject) => {
    conn.run(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      conn.close();
    });
  });
}

function insertData(database_name, table_name, subject, question, answer) {
  let conn = new sqlite3.Database(database_name);
  let query = `INSERT INTO ${table_name} (subject, question, answer) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    conn.serialize(() => {
      let stmt = conn.prepare(query);
      for (let i = 0; i < 25; i++) {
        stmt.run(subject, question, answer);
      }
      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
        conn.close();
      });
    });
  });
}

module.exports = {
  checkTableExists,
  createTable,
  insertData
};