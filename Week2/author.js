const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors',
  port: 3306
});

connection.connect();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('F', 'M', 'Other'),
    mentor INT,
    FOREIGN KEY (mentor) REFERENCES authors(author_id)
  );
`;

connection.query(createTableQuery, (err, results) => {
  if (err) throw err;
  console.log('Table authors created successfully!');
  connection.end();
});
