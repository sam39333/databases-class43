 
const { MongoClient } = require("mongodb");


  const uri =
    "mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);   
   

async function transfer(fromAccount, toAccount, amount, remark) {
  try {
    await client.connect();

    const db = client.db("sam");
    const accountsCollection = db.collection("account");

    const session = client.startSession();

    try {
      session.startTransaction();

      const fromQuery = { account_number: fromAccount };
      const fromAccountDoc = await accountsCollection.findOne(fromQuery, {
        session
      });

      if (!fromAccountDoc) {
        throw new Error(`Account ${fromAccount} not found.`);
      }

      const toQuery = { account_number: toAccount };
      const toAccountDoc = await accountsCollection.findOne(toQuery, {
        session
      });
      console.log("fromAccountDoc:", fromAccountDoc);

      if (!toAccountDoc) {
        throw new Error(`Account ${toAccount} not found.`);
      }
      if (fromAccountDoc.balance < amount) {
        throw new Error("Insufficient balance.");
      }

      const fromBalanceUpdate = {
        $inc: { balance: -amount, change_number: 1 }
      };
      const toBalanceUpdate = { $inc: { balance: amount, change_number: 1 } };

      await accountsCollection.updateOne(fromQuery, fromBalanceUpdate, {
        session
      });
      await accountsCollection.updateOne(toQuery, toBalanceUpdate, { session });

      const fromChangeNumber = fromAccountDoc.change_number + 1;
      const toChangeNumber = toAccountDoc.change_number + 1;
      const changeDate = new Date();

      const fromChange = {
        change_number: fromChangeNumber,
        amount: -amount,
        changed_date: changeDate,
        remark
      };
      const toChange = {
        change_number: toChangeNumber,
        amount,
        changed_date: changeDate,
        remark
      };

      await accountsCollection.updateOne(
        fromQuery,
        { $push: { account_changes: fromChange } },
        { session }
      );
      await accountsCollection.updateOne(
        toQuery,
        { $push: { account_changes: toChange } },
        { session }
      );

      await session.commitTransaction();
      console.log("Transfer completed successfully.");
    } catch (error) {
      await session.abortTransaction();
      console.error("Transfer failed:", error);
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Transfer failed:", error);
  } finally {
    client.close();
  }
}

module.exports = transfer;
