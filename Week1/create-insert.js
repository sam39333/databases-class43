const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server');

  const createDatabase = `CREATE DATABASE IF NOT EXISTS meetup`;
  connection.query(createDatabase, (err) => {
    if (err) throw err;
    console.log('Database "meetup" created');

    connection.query('USE meetup', (err) => {
      if (err) throw err;

      const createInviteeTable = `CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT PRIMARY KEY AUTO_INCREMENT,
        invitee_name VARCHAR(50),
        invited_by INT,
        FOREIGN KEY (invited_by) REFERENCES Invitee (invitee_no)
      )`;
      
      connection.query(createInviteeTable, (err) => {
        if (err) throw err;
        console.log('Invitee table created');

        const createRoomTable = `CREATE TABLE IF NOT EXISTS Room (
          room_no INT PRIMARY KEY AUTO_INCREMENT,
          room_name VARCHAR(50),
          floor_number INT
        )`;
        connection.query(createRoomTable, (err) => {
          if (err) throw err;
          console.log('Room table created');

          const createMeetingTable = `CREATE TABLE IF NOT EXISTS Meeting (
            meeting_no INT PRIMARY KEY AUTO_INCREMENT,
            meeting_title VARCHAR(50),
            starting_time DATETIME,
            ending_time DATETIME,
            room_no INT,
            FOREIGN KEY (room_no) REFERENCES Room (room_no)
          )`;
          connection.query(createMeetingTable, (err) => {
            if (err) throw err;
            console.log('Meeting table created');

            const insertData = async () => {
              try {
                const insertInvitees = `INSERT INTO Invitee (invitee_name, invited_by) VALUES ?`;
                const inviteeValues = [
                    ['Iron Man', 1],
                    ['Natasha Romanoff', 2],
                    ['Wanda Maximoff', 3],
                    ['Black Panther', 4],
                    ['Stan Lee', 5],
                  ];
                await connection.query(insertInvitees, [inviteeValues]);
                console.log('Data inserted into Invitee table');

                const insertRooms = `INSERT INTO Room (room_name, floor_number) VALUES ?`;
                const roomValues = [
                  ['Conference Room A', 1],
                  ['Conference Room B', 2],
                  ['Meeting Room 1', 1],
                  ['Meeting Room 2', 2],
                  ['Boardroom', 3],
                ];
                await connection.query(insertRooms, [roomValues]);
                console.log('Data inserted into Room table');

                connection.end();
              } catch (err) {
                throw err;
              }
            };

            insertData();
          });
        });
      });
    });
  });
});
