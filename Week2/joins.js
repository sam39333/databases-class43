const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'authors',
  port: 3306
});

connection.connect();

const query1 = `
SELECT a.author_name, m.author_name AS mentor_name
FROM authors AS a
LEFT JOIN authors AS m ON a.mentor = m.author_id;
`;


const query2 = `
SELECT a.*, rp.paper_title
FROM authors AS a
LEFT JOIN research_papers AS rp ON a.author_id = rp.author_id;
`;


connection.query(query1, (err, results) => {
  if (err) throw err;
  console.log('Names of authors and their mentors:');
  results.forEach(row => {
    console.log(`${row.author_name} - ${row.mentor_name}`);
  });

 
  connection.query(query2, (err, results) => {
    if (err) throw err;
    console.log('\nAuthors and their published paper titles:');
    results.forEach(row => {
      const paperTitle = row.paper_title || 'No published paper';
      console.log(`${JSON.stringify(row)} - ${paperTitle}`);
    });

    connection.end();
  });
});
