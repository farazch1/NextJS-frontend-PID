"use server";
const express = require('express');
const sql = require("msnodesqlv8");

const app = express();
const serverName = "LATUTUDE_7390\\SQLEXPRESS";
const connectionString = "server="+serverName+";Database=Twin;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Adjust for specific origin if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json()); // Parse JSON request bodies

app.post('/data', (req, res) => {
  const { query } = req.body; // Destructure query from request body

  if (!query) {
    return res.status(400).send({ message: 'Missing query parameter' }); // Handle missing query
  }

  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error fetching data' });
    } else {
      res.json(rows);
      console.log(rows);
    }
  });
});

// Remove the GET endpoint as it's not used for dynamic queries

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});