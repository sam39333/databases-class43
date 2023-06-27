const { MongoClient } = require('mongodb');

async function transferAmount() {
  const uri = 'mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('sam');

    const session = client.startSession();
    session.startTransaction();

    try {
      const accountCollection = db.collection('account');
      const accountChangesCollection = db.collection('account_changes');

      await accountCollection.updateOne(
        { account_number: 101 },
        { $inc: { balance: -1000 } },
        { session }
      );

    
      await accountCollection.updateOne(
        { account_number: 102 },
        { $inc: { balance: 1000 } },
        { session }
      );

    
      await accountChangesCollection.insertOne(
        {
          account_number: 101,
          amount: -1000,
          changed_date: new Date(),
          remark: 'Transfer to account 102',
        },
        { session }
      );

      await session.commitTransaction();
      console.log('Amount transferred successfully!');
    } catch (error) {
      await session.abortTransaction();
      console.error('Error transferring amount:', error);
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

transferAmount();
