const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const validator = require('validator'); // Importing validator

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Not necessary if body-parser is used, but okay to keep

// MySQL connection with reconnection logic
const dbConfig = {
  host: 'mydb.c3u0iym6iuph.eu-west-3.rds.amazonaws.com', // Use 'localhost' for local MySQL, change if using remote
  user: 'admin', // Your MySQL username
  password: 'chowdary', // Your MySQL password
  database: 'cricketDB' // Your MySQL database
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(function (err) {
    if (err) {
      console.log('Error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // 2 seconds
    }
  });

  connection.on('error', function (err) {
    console.log('DB error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually lost.
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// Submit-form route
app.post('/submit-form', (req, res) => {
  // Log incoming request data
  console.log('Received data:', req.body);
  const { name, email, teamName, players } = req.body; // Extract data from request body

  // Validate email format using validator
  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Invalid email format' });
  }

  // Validate the number of players (should be exactly 11)
  const playerArray = players.split(',').map(player => player.trim());
  if (playerArray.length !== 11) {
    return res.status(400).send({ error: 'A cricket team must have exactly 11 players.' });
  }

  // SQL query to insert form data into the database
  const sql = 'INSERT INTO players (name, email, teamName, players) VALUES (?, ?, ?, ?)';
  const values = [name, email, teamName, players]; // Use data from the request

  // Execute the query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Failed to insert data:', err);
      return res.status(500).send({ error: 'Failed to save form data' });
    }
    // Optionally, you could also send the inserted ID back
    res.status(200).send({ message: 'Form data saved successfully!', id: result.insertId });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
