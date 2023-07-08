const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'account',
  port: 3306
});

connection.connect();

const insertAccountData = `
  INSERT INTO account (account_number, balance)
  VALUES
    (101, 1000),
    (102, 2000),
    (103, 5000);
`;

const insertAccountChangesData = `
  INSERT INTO account_changes (account_number, amount, changed_date, remark)
  VALUES
    (1, 1000, NOW(), 'Initial deposit'),
    (2, -500, NOW(), 'Withdrawal'),
    (3, 2000, NOW(), 'Transfer received');
`;

connection.query(insertAccountData, (error) => {
  if (error) {
    console.error('Error inserting account data:', error);
    connection.end();
    return;
  }

  connection.query(insertAccountChangesData, (error) => {
    if (error) {
      console.error('Error inserting account_changes data:', error);
    } else {
      console.log('data inserted successfully!');
    }

    connection.end();
  });
});
