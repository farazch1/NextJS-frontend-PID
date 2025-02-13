const express = require('express');
const sql = require("msnodesqlv8");

const app = express();
const serverName = "LATUTUDE_7390\\SQLEXPRESS";
const connectionString = "server=" + serverName + ";Database=Twin;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";

// Hardcoded lag time data
const lagTimeData = [
  { Name: "Tarbela_to_Chashma", Nov_to_April: 3, May_to_Jun: 2, Jul_to_Aug: 2, Sep_to_Oct: 2 },
  { Name: "Chashma_to_Taunsa", Nov_to_April: 4, May_to_Jun: 3, Jul_to_Aug: 2, Sep_to_Oct: 2 },
  { Name: "Taunsa_to_Guddu", Nov_to_April: 4, May_to_Jun: 3, Jul_to_Aug: 3, Sep_to_Oct: 3 },
  { Name: "Guddu_to_Sukkur", Nov_to_April: 2, May_to_Jun: 1, Jul_to_Aug: 1, Sep_to_Oct: 1 },
  { Name: "Sukkur_to_Kotri", Nov_to_April: 5, May_to_Jun: 4, Jul_to_Aug: 3, Sep_to_Oct: 3 },
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get('/rivers-data', async (req, res) => {
  const reach = req.query.reach;
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;
  const riv_selection_tg = req.query.riv_selection_tg;
  const riv_selection_tc = req.query.riv_selection_tc;

  // Validate parameters
  if (!reach || !startDate || !endDate || (reach == "Taunsa_to_Guddu" && !riv_selection_tg) || (reach == "Tarbela_to_Chashma" && !riv_selection_tc)) {
    return res.status(400).send({ message: 'Missing required query parameters: name or date' });
  }

  const allowedTables = ['Tarbela_to_Chashma', 'Chashma_to_Taunsa', 'Taunsa_to_Guddu', 'Guddu_to_Sukkur', 'Sukkur_to_Kotri'];
  const allowedRivers_tc = ['Tarbela', 'Chashma'];
  const allowedRivers_tg = ['Pnj', 'Guddu'];
  if (!allowedTables.includes(reach)) {
    return res.status(400).send({ message: 'Invalid table name' });
  }
  if (reach == "Taunsa_to_Guddu" && !allowedRivers_tg.includes(riv_selection_tg)) {
    return res.status(400).send({ message: "Invalid river" });
  }
  if (reach == "Tarbela_to_Chashma" && !allowedRivers_tc.includes(riv_selection_tc)) {
    return res.status(400).send({ message: "Invalid river" });
  }

  let dateCol;
  switch (reach) {
    case 'Tarbela_to_Chashma':
      dateCol = riv_selection_tc == "Tarbela" ? "Date" : "Chashma_Date";
      break;
    case 'Chashma_to_Taunsa':
      dateCol = "Taunsa_Date";
      break;
    case 'Taunsa_to_Guddu':
      dateCol = riv_selection_tg == "Pnj" ? "Pnj_Date" : "Guddu_Date";
      break;
    case 'Guddu_to_Sukkur':
      dateCol = "Sukkur_Date";
      break;
    case 'Sukkur_to_Kotri':
      dateCol = "Kotri_Date";
      break;
  }

  const querys = `SELECT * FROM [${reach}] WHERE ${dateCol} BETWEEN '${startDate}' AND '${endDate}'`;

  sql.query(connectionString, querys, async (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send({ message: 'Error fetching data', error: err.message });
    }

    // Calculate lag time
    const lagTime = calculateLagTime(reach, startDate);

    // Calculate loss and gain if reach is Tarbela_to_Chashma and riv_selection_tc is Chashma
    let result = rows;
    if (reach === "Tarbela_to_Chashma" && riv_selection_tc === "Chashma") {
      result = await calculateLossAndGain(rows, lagTime, reach);
    }

    // // Add lag time to the result
    // result = result.map(row => ({
    //   ...row,
    // }));

    res.json(result);
  });
});

// Function to calculate loss and gain
async function calculateLossAndGain(rows, lagTime, reach) {
  const updatedRows = [];

  for (const row of rows) {
    const currentDate = new Date(row.Chashma_Date);
    const lagDate = new Date(currentDate);
    lagDate.setDate(lagDate.getDate() - lagTime);

    // Fetch the corresponding row for the lag date
    const lagRow = await fetchRowForDate(reach, lagDate);

    if (lagRow) {
      const lossAndGain = row.Chashma_upstream - lagRow.Bal_for_Chashma;
      console.log("CHASHMA U_S",row.Chashma_upstream);
      console.log("BAL FOR CHASHMA",lagRow.Bal_for_Chashma);
      updatedRows.push({
        ...row,
        Loss_and_Gain: lossAndGain
      });
    } else {
      updatedRows.push({
        ...row,
        Loss_and_Gain: null // If no matching row is found
      });
    }
  }

  return updatedRows;
}

// Function to fetch a row for a specific date
function fetchRowForDate(reach, date) {
  return new Promise((resolve, reject) => {
    const dateCol = reach === "Tarbela_to_Chashma" ? "Date" : "Chashma_Date";
    const formattedDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format

    const query = `SELECT * FROM [${reach}] WHERE ${dateCol} = '${formattedDate}'`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        console.error('Error fetching row for date:', err);
        reject(err);
      } else {
        resolve(rows[0]); // Return the first matching row
      }
    });
  });
}

// Function to calculate lag time
function calculateLagTime(reach, date) {
  const month = new Date(date).getMonth() + 1;
  const lagTimeEntry = lagTimeData.find(entry => entry.Name === reach);

  if (!lagTimeEntry) return 0;

  if (month >= 11 || month <= 4) {
    return lagTimeEntry.Nov_to_April;
  } else if (month >= 5 && month <= 6) {
    return lagTimeEntry.May_to_Jun;
  } else if (month >= 7 && month <= 8) {
    return lagTimeEntry.Jul_to_Aug;
  } else {
    return lagTimeEntry.Sep_to_Oct;
  }
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});