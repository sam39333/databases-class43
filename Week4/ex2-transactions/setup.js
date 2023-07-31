const { MongoClient } = require('mongodb');

async function setup() {
 
    const uri = 'mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("transaction");
    const accountsCollection = db.collection("account");

    await accountsCollection.deleteMany({});

    const sampleAccounts = [
      {
        account_number: "123456789",
        balance: 1000,
        account_changes: [
          {
            change_number: 1,
            amount: 100,
            changed_date: new Date(),
            remark: "Initial deposit"
          },
          {
            change_number: 2,
            amount: -50,
            changed_date: new Date(),
            remark: "Withdrawal"
          }
        ]
      },
      {
        account_number: "987654321",
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date(),
            remark: "Initial deposit"
          }
        ]
      }
    ];

    await accountsCollection.insertMany(sampleAccounts);

    console.log("Setup completed successfully.");
  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    client.close();
  }
}

module.exports = setup;
