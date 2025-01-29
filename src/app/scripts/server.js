const express = require('express');
const sql = require("msnodesqlv8");
const { json } = require('stream/consumers');

const app = express();
const serverName = "LATUTUDE_7390\\SQLEXPRESS";
const connectionString = "server="+serverName+";Database=Twin;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Adjust for specific origin if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json()); // Parse JSON request bodies


app.get('/rivers-data', (req, res) => {
  const reach = req.query.reach;
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;
  const riv_selection = req.query.riv_selection;

  // Validate parameters
  if (!reach || !startDate || !endDate || (reach == "Taunsa_to_Guddu" && !riv_selection)) {
    return res.status(400).send({ message: 'Missing required query parameters: name or date' });
  }

  // Ensure the table name is sanitized
  const allowedTables = ['Tarbela_to_Chashma', 'Chashma_to_Taunsa', 'Taunsa_to_Guddu', 'Guddu_to_Sukkur', 'Sukkur_to_Kotri']; // Add your valid table names here
  const allowedRivers = ['Pnj', 'Guddu']
  if (!allowedTables.includes(reach)) {
    return res.status(400).send({ message: 'Invalid table name' });
  }
  if(reach == "Taunsa_to_Guddu" && !allowedRivers.includes(riv_selection)){
    return res.status(400).send({message: "Invalid river"})
  }

  let dateCol;

  switch(reach)
  {
    case 'Tarbela_to_Chashma':
      dateCol = "Date";
      break;
    case 'Chashma_to_Taunsa':
      dateCol = "Taunsa_Date";
      break;
    case 'Taunsa_to_Guddu':
      if(riv_selection == "Pnj"){
        dateCol = "Pnj_Date";
      }
      else{
        dateCol = "Guddu_Date";
      }
      break;
    case 'Guddu_to_Sukkur':
      dateCol = "Sukkur_Date";
      break;
    case 'Sukkur_to_Kotri':
      dateCol = "Kotri_Date";
      break;
  }

  const querys = `SELECT * FROM [${reach}] WHERE ${dateCol} BETWEEN '${startDate}' AND '${endDate}'`;
  
  sql.query(connectionString, querys, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ message: 'Error fetching data', error: err.message });
    }
    console.log(typeof(rows));
    res.json(rows);
  });
});

// Remove the GET endpoint as it's not used for dynamic queries

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});