const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Подключаемся к файлу БД
const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

// Создаем таблицу пользователей при первом запуске
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

class User {
  // Создание пользователя
  static create(email, password, name, callback) {
    const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
    db.run(sql, [email, password, name], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, email, name });
    });
  }

  // Поиск по email
  static findByEmail(email, callback) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  }

  // Поиск по ID (для защиты роутов)
  static findById(id, callback) {
    const sql = 'SELECT id, email, name FROM users WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  }
}

module.exports = User;