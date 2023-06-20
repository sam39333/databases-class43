const  mysql = require('mysql');
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

  const createTableQuery = `
    CREATE TABLE research_papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(255),
      conference VARCHAR(255),
      publish_date DATE,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id)
    );
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log('Table research_papers created successfully!');


const insertAuthorsQuery = `
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
  VALUES
    ('Douglas Adams', 'University of Cambridge', '1940-05-01', 10, 'male'),
    ('Dante Alighieri', 'Harvard University ', '1999-07-02', 12, 'male'),
    ('Chimamanda Ngozi Adichie', 'University of Oxford ', '2001-06-02', 12, 'female'),
    ('Monica Ali', 'University of Oxford ', '1991-09-02', 12, 'female'),
    ('Philip Ardagh', 'UCL (University College London)  ', '1995-08-02', 12, 'male'),
    ('Maya Angelou', 'University of Chicago ', '1989-02-02', 12, 'female'),
    ('Isaac Asimov', 'University of Pennsylvania ', '1891-02-02', 12, 'male'),
    ('Margaret Atwood', 'University of Pennsylvania', '1982-02-02', 12, 'female'),
    ('Paul Auster', 'Princeton University ', '1996-10-02', 12, 'male'),
    ('Jane Austen', 'Yale University ', '1895-11-02', 12, 'female'),
    ('James Baldwin', 'Cornell University ', '1971-02-02', 12, 'male'),
    ('Agatha Christie', 'Johns Hopkins University ', '1988-03-02', 12, 'female'),
    ('Tom Clancy', 'University of California, Berkeley', '2005-12-02', 12, 'male'),
    ('Emily Dickinson', 'Australian National University ', '1998-01-02', 12, 'female'),
    ('Andrea Levy', 'Northwestern University ', '1973-02-02', 12, 'female')
`;

connection.query(insertAuthorsQuery, (err, results) => {
  if (err) throw err;
  console.log('Rows inserted for authors successfully!');



const insertResearchPapersQuery = `
  INSERT INTO research_papers (paper_id, paper_title, conference, publish_date, author_id)
  VALUES
    (1, 'Paper 1', 'Conference A', '2022-01-01', (SELECT author_id FROM authors WHERE author_name = 'James Baldwins' LIMIT 1)),
    (2, 'Paper 2', 'Conference B', '2022-09-02', (SELECT author_id FROM authors WHERE author_name = 'Monica Alis' LIMIT 1)),
    (3, 'Paper 3', 'Conference C', '2022-02-02', (SELECT author_id FROM authors WHERE author_name = 'Douglas Adams' LIMIT 1)),
    (4, 'Paper 4', 'Conference D', '2022-01-02', (SELECT author_id FROM authors WHERE author_name = 'Dante Alighieri' LIMIT 1)),
    (5, 'Paper 5', 'Conference E', '2022-03-02', (SELECT author_id FROM authors WHERE author_name = 'Maya Angelou' LIMIT 1)),
    (6, 'Paper 6', 'Conference F', '2022-07-02', (SELECT author_id FROM authors WHERE author_name = 'Isaac Asimov' LIMIT 1)),
    (7, 'Paper 7', 'Conference G', '2022-05-02', (SELECT author_id FROM authors WHERE author_name = 'Jane Austen' LIMIT 1)),
    (8, 'Paper 8', 'Conference H', '2022-01-02', (SELECT author_id FROM authors WHERE author_name = 'James Baldwin' LIMIT 1)),
    (9, 'Paper 9', 'Conference I', '2022-02-10', (SELECT author_id FROM authors WHERE author_name = 'Tom Clancy' LIMIT 1)),
    (10, 'Paper 10', 'Conference J', '2022-09-02', (SELECT author_id FROM authors WHERE author_name = 'Chimamanda Ngozi Adichie' LIMIT 1)),
    (11, 'Paper 11', 'Conference K', '2022-02-02', (SELECT author_id FROM authors WHERE author_name = 'Monica Alis' LIMIT 1)),
    (12, 'Paper 12', 'Conference L', '2022-01-02', (SELECT author_id FROM authors WHERE author_name = 'Jane Austen' LIMIT 1)),
    (13, 'Paper 13', 'Conference M', '2022-08-09', (SELECT author_id FROM authors WHERE author_name = 'Margaret Atwood' LIMIT 1)),
    (14, 'Paper 14', 'Conference N', '2022-09-02', (SELECT author_id FROM authors WHERE author_name = 'Dante Alighieri' LIMIT 1)),
    (15, 'Paper 15', 'Conference O', '2022-07-08', (SELECT author_id FROM authors WHERE author_name = 'Douglas Adams' LIMIT 1)),
    (16, 'Paper 16', 'Conference P', '2022-05-05', (SELECT author_id FROM authors WHERE author_name = 'Maya Angelou' LIMIT 1)),
    (17, 'Paper 17', 'Conference A', '2022-06-02', (SELECT author_id FROM authors WHERE author_name = 'Emily Dickinson' LIMIT 1)),
    (18, 'Paper 18', 'Conference B', '2022-03-02', (SELECT author_id FROM authors WHERE author_name = 'Tom Clancy' LIMIT 1)),
    (19, 'Paper 19', 'Conference C', '2022-07-06', (SELECT author_id FROM authors WHERE author_name = 'Philip Ardagh' LIMIT 1)),
    (20, 'Paper 20', 'Conference D', '2022-05-02', (SELECT author_id FROM authors WHERE author_name = 'Andrea Levy' LIMIT 1)),
    (21, 'Paper 21', 'Conference E', '2022-09-05', (SELECT author_id FROM authors WHERE author_name = 'Monica Ali' LIMIT 1)),
    (22, 'Paper 22', 'Conference F', '2022-08-02', (SELECT author_id FROM authors WHERE author_name = 'Andrea Levy' LIMIT 1)),
    (23, 'Paper 23', 'Conference G', '2022-09-02', (SELECT author_id FROM authors WHERE author_name = 'Isaac Asimov' LIMIT 1)),
    (24, 'Paper 24', 'Conference H', '2022-05-02', (SELECT author_id FROM authors WHERE author_name = 'Paul Auster' LIMIT 1)),
    (25, 'Paper 25', 'Conference I', '2022-03-03', (SELECT author_id FROM authors WHERE author_name = 'Agatha Christie' LIMIT 1)),
    (26, 'Paper 26', 'Conference J', '2022-06-01', (SELECT author_id FROM authors WHERE author_name = 'Emily Dickinson' LIMIT 1)),
    (27, 'Paper 27', 'Conference K', '2022-02-04', (SELECT author_id FROM authors WHERE author_name = 'Chimamanda Ngozi Adichie' LIMIT 1)),
    (28, 'Paper 28', 'Conference L', '2022-05-02', (SELECT author_id FROM authors WHERE author_name = 'Agatha Christie' LIMIT 1)),
    (29, 'Paper 29', 'Conference M', '2022-01-03', (SELECT author_id FROM authors WHERE author_name = 'Margaret Atwood' LIMIT 1)),
    (30, 'Paper 30', 'Conference N', '2022-06-10', (SELECT author_id FROM authors WHERE author_name = 'Philip Ardagh' LIMIT 1))
`;

connection.query(insertResearchPapersQuery, (err, results) => {
  if (err) throw err;
  console.log('Rows inserted for research papers successfully!');
  connection.end();
});
});
});
});


