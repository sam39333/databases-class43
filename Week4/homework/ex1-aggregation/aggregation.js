const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://sam:AqjJ284OtX8gW2hm@cluster0.qbzjczy.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'databaseWeek4';
const collectionName = 'population';

MongoClient.connect(uri, function(err, client) {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const dataArray = [];

  fs.createReadStream('population_pyramid_1950-2022.csv')
    .pipe(csv())
    .on('data', (data) => {
      dataArray.push(data);
    })
    .on('end', () => {
      collection.insertMany(dataArray, function(err, result) {
        if (err) {
          console.log('Error inserting data:', err);
        } else {
          console.log('Data imported successfully!');
        }
        client.close();
      });
    });
});

const getTotalPopulationByCountry = async (country) => {
  const pipeline = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const result = await db.collection("population").aggregate(pipeline).toArray();
  return result;
};

const getContinentInfoByYearAndAge = async (year, age) => {
  const pipeline = [
    {
      $match: {
        Year: year,
        Age: age,
        Country: { $in: ["Asia", "Europe", "Africa", "North America", "South America", "Oceania"] }

      },
    },
    {
      $addFields: {
        TotalPopulation: { $add: ["$M", "$F"] },
      },
    },
  ];

  const result = await db.collection("population").aggregate(pipeline).toArray();
  return result;
};

  


