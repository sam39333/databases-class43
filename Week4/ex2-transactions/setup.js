const { MongoClient } = require('mongodb');

async function setup() {
 
    const uri = 'mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('transaction');
    const accountsCollection = db.collection('account');

    await accountsCollection.deleteMany({});


    console.log('Setup completed successfully.');
  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    client.close();
  }
}

module.exports = setup;
