const { resolvePath } = require('react-router-dom');

const sqlite3 = require('sqlite3').verbose();
const database_name = "flashcards.sqlite"

function checkTableExists(table_name) {
  let conn = new sqlite3.Database(database_name);
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

function createTable(table_name) {
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

function insertData(table_name, subject, question, answer) {
  let conn = new sqlite3.Database(database_name);
  let query = `INSERT INTO ${table_name} (subject, question, answer) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    let stmt = conn.prepare(query);
    stmt.run(subject, question, answer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      stmt.finalize();
      conn.close();
    });
  });
}


function getData(table_name, subject, questionNumber) {
  let conn = new sqlite3.Database(database_name);
  let query = `SELECT question, answer FROM ${table_name} WHERE subject = ?;`;

  return new Promise((resolve, reject) => {
    conn.get(query, [subject], (err, row) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
        return;
      }
      console.log('Successful data retreival');
      resolve(row[questionNumber]);
    })
    conn.close();
  });
}

function getQuestionCount(table_name, subject) {
  let conn = new sqlite3.Database(database_name);
  let query = `SELECT id FROM ${table_name} WHERE subject = ?;`;

  return new Promise((resolve, reject) => {
    conn.all(query, [subject], (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      }
      resolve(parseInt(rows.length));
    })
  });
}



module.exports = {
  checkTableExists,
  createTable,
  insertData,
  getData,
  getQuestionCount,
  
};