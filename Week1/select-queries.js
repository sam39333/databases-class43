const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');

  
  const selectQueries = [
    "SELECT Name FROM country WHERE Population > 8000000",
    "SELECT Name FROM country WHERE Name LIKE '%land%'",
    "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
    "SELECT Name FROM country WHERE Continent = 'Europe'",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC",
    "SELECT Name FROM city WHERE CountryCode = 'NLD'",
    "SELECT Population FROM city WHERE Name = 'Rotterdam'",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
    "SELECT Name FROM city ORDER BY Population DESC LIMIT 10",
    "SELECT SUM(Population) AS TotalPopulation FROM country",
  ];

  
  selectQueries.forEach((query, index) => {
    connection.query(query, (err, results) => {
      if (err) throw err;
      console.log(`Result ${index + 1}:`, results);
    });
  });

  connection.end();
});
