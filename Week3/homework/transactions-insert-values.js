const { MongoClient } = require('mongodb');

async function insertSampleData() {
  const uri = 'mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('sam');
    const accountCollection = db.collection('account');
    
    await accountCollection.insertMany([
      { account_number: 101, balance: 1000 },
      { account_number: 102, balance: 2000 },
      { account_number: 103, balance: 5000 },
    ]);

 
    const accountChangesCollection = db.collection('account_changes');
    await accountChangesCollection.insertMany([
      {
        account_number: 1,
        amount: 1000,
        changed_date: new Date(),
        remark: 'Initial deposit',
      },
      {
        account_number: 2,
        amount: -500,
        changed_date: new Date(),
        remark: 'Withdrawal',
      },
      {
        account_number: 3,
        amount: 2000,
        changed_date: new Date(),
        remark: 'Transfer received',
      },
    ]);

    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await client.close();
  }
}

insertSampleData();
