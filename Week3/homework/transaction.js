const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'account',
  port: 3306
});

connection.connect();

async function transferAmount() {
  const startTransaction = 'START TRANSACTION;';
  const rollbackTransaction = 'ROLLBACK;';
  const commitTransaction = 'COMMIT;';

  const transferQueries = [
    `UPDATE account
     SET balance = balance - 1000
     WHERE account_number = 101;`,
    `UPDATE account
     SET balance = balance + 1000
     WHERE account_number = 102;`,
    `INSERT INTO account_changes (account_number, amount, changed_date, remark)
     VALUES (101, -1000, NOW(), 'Transfer to account 102');`,
  ];

  connection.query(startTransaction, async (error) => {
    if (error) {
      console.error('Error starting transaction:', error);
      connection.end();
      return;
    }

    try {
      for (const query of transferQueries) {
        await new Promise((resolve, reject) => {
          connection.query(query, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      connection.query(commitTransaction, (error) => {
        if (error) {
          console.error('Error committing transaction:', error);
        } else {
          console.log('Amount transferred successfully!');
        }
        
        connection.end();
      });
    } catch (error) {
      connection.query(rollbackTransaction, (rollbackError) => {
        if (rollbackError) {
          console.error('Error rolling back transaction:', rollbackError);
        } else {
          console.error('Error transferring amount:', error);
        }
        
        connection.end();
      });
    }
  });
}

transferAmount();
