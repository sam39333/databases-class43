const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('sam');
    await db.createCollection('account');
    await db.createCollection('account_changes');

    console.log('Collections created successfully!');
  } catch (error) {
    console.error('Error creating collections:', error);
  } finally {
    await client.close();
  }
}

main();

