function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn

    //Boolean-based SQL injection can be used, this condition always evaluate to true ,making it easier to retrieve other data.
    //getPopulation('countries', "' OR '1'='1", "' OR '1'='1", cb);
  
    const query = 'SELECT Population FROM ?? WHERE Name = ? and code = ?';
    const values = [Country, name, code];
  
    conn.query(query, values, function (err, result) {
      if (err) {
        cb(err);
      } else {
        if (result.length === 0) {
          cb(new Error("Not found"));
        } else {
          cb(null, result[0].name);
        }
      }
    });
  }
  
  
  
  