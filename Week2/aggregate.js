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
SELECT research_papers.paper_title, COUNT(research_papers.author_id) AS author_count
FROM research_papers
GROUP BY research_papers.paper_id;
`;

connection.query(query1, (err, results) => {
  if (err) throw err;
  console.log('Query 1: All research papers and the number of authors that wrote that paper:');
  console.log(results);
});


const query2 = `
SELECT COUNT(research_papers.paper_id) AS total_papers
FROM research_papers
JOIN authors ON research_papers.author_id = authors.author_id
WHERE authors.gender = 'female';
`;

connection.query(query2, (err, results) => {
  if (err) throw err;
  console.log('Query 2: Sum of the research papers published by all female authors:');
  console.log(results);
});


const query3 = `
SELECT university, AVG(h_index) AS average_h_index
FROM authors
GROUP BY university;
`;

connection.query(query3, (err, results) => {
  if (err) throw err;
  console.log('Query 3: Average of the h-index of all authors per university:');
  console.log(results);
});


const query4 = `
SELECT university, SUM(research_papers.paper_id) AS total_papers
FROM authors
JOIN research_papers ON authors.author_id = research_papers.author_id
GROUP BY university;
`;

connection.query(query4, (err, results) => {
  if (err) throw err;
  console.log('Query 4: Sum of the research papers of the authors per university:');
  console.log(results);
});


const query5 = `
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;
`;

connection.query(query5, (err, results) => {
  if (err) throw err;
  console.log('Query 5: Minimum and maximum of the h-index of all authors per university:');
  console.log(results);
});

connection.end();
