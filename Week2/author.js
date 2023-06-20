const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors',
  port: 3306
});

connection.connect();

const dropTableQuery = `DROP TABLE IF EXISTS research_papers`;

connection.query(dropTableQuery, (err, results) => {
  if (err) throw err;
  console.log('Table research_papers dropped successfully!');

  const dropAuthorsTableQuery = `DROP TABLE IF EXISTS authors`;

  connection.query(dropAuthorsTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Table authors dropped successfully!');

    const createTableQuery = `
      CREATE TABLE authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(255),
        university VARCHAR(255),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(10)
      );
    `;

    connection.query(createTableQuery, (err, results) => {
      if (err) throw err;
      console.log('Table authors created successfully!');

      const addColumnQuery = `
        ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
      `;

      connection.query(addColumnQuery, (err, results) => {
        if (err) throw err;
        console.log('Column mentor added successfully!');
        connection.end();
      });
    });
  });
});
