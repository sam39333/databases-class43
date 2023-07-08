const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  port: 3306
});

connection.connect();

const createDatabase = 'CREATE DATABASE IF NOT EXISTS account;';
const useDatabase = 'USE account;';

const createAccountTable = `
  CREATE TABLE account (
    account_number INT,
    balance INT
  );
`;

const createAccountChangesTable = `
  CREATE TABLE account_changes (
    account_number INT,
    amount INT,
    changed_date DATETIME,
    remark VARCHAR(255)
  );
`;

connection.query(createDatabase, (error) => {
  if (error) {
    console.error('Error creating account database:', error);
    connection.end();
    return;
  }

  connection.query(useDatabase, (error) => {
    if (error) {
      console.error('Error using account database:', error);
      connection.end();
      return;
    }

    connection.query(createAccountTable, (error) => {
      if (error) {
        console.error('Error creating account table:', error);
        connection.end();
        return;
      }

      connection.query(createAccountChangesTable, (error) => {
        if (error) {
          console.error('Error creating account_changes table:', error);
        } else {
          console.log('Tables created successfully!');
        }

        connection.end();
      });
    });
  });
});
