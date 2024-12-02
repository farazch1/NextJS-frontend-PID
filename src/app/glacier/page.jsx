"use client";
import React, { useState } from "react";
import Layout from "../components/layout";
import { Box, Typography, Grid, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button, MenuItem } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, RadialBarChart, RadialBar } from "recharts";

// Sample glacier-related data for the charts (Snow accumulation, meltwater, mass balance)
const glacierData = [
  { name: "January", SnowAccumulation: 120, MeltwaterFlow: 80, MassBalance: 40 },
  { name: "February", SnowAccumulation: 110, MeltwaterFlow: 90, MassBalance: 20 },
  { name: "March", SnowAccumulation: 100, MeltwaterFlow: 110, MassBalance: -10 },
  { name: "April", SnowAccumulation: 80, MeltwaterFlow: 120, MassBalance: -40 },
  { name: "May", SnowAccumulation: 60, MeltwaterFlow: 130, MassBalance: -70 },
  { name: "June", SnowAccumulation: 50, MeltwaterFlow: 150, MassBalance: -100 },
  { name: "July", SnowAccumulation: 30, MeltwaterFlow: 180, MassBalance: -150 },
];

export default function GlacierPage() {
  const [plotType, setPlotType] = useState("AreaChart");
  const [factor, setFactor] = useState("MeltwaterFlow");
  const [selectedData, setSelectedData] = useState(glacierData);

  const handlePlotTypeChange = (event) => {
    setPlotType(event.target.value);
  };

  const handleFactorChange = (event) => {
    setFactor(event.target.value);
  };

  const handleView = () => {
    // Logic for filtering data or updating chart based on inputs can go here
    console.log("Viewing glacier data...");
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Glacier Melt and Water Flow Impact on Irrigation
        </Typography>
        <Grid container spacing={3}>
          {/* Input Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
              <FormControl fullWidth margin="normal">
                <TextField label="Glacier" select>
                  <MenuItem value="Glacier1">Glacier 1</MenuItem>
                  <MenuItem value="Glacier2">Glacier 2</MenuItem>
                </TextField>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField label="From Date" type="date" InputLabelProps={{ shrink: true }} />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField label="To Date" type="date" InputLabelProps={{ shrink: true }} />
              </FormControl>
              <FormControl component="fieldset" margin="normal">
                <Typography>Plotting Factor:</Typography>
                <RadioGroup value={factor} onChange={handleFactorChange} row>
                  <FormControlLabel value="SnowAccumulation" control={<Radio />} label="Snow Accumulation" />
                  <FormControlLabel value="MeltwaterFlow" control={<Radio />} label="Meltwater Flow" />
                  <FormControlLabel value="MassBalance" control={<Radio />} label="Mass Balance" />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" margin="normal">
                <Typography>Plot Type:</Typography>
                <RadioGroup value={plotType} onChange={handlePlotTypeChange} row>
                  <FormControlLabel value="AreaChart" control={<Radio />} label="Area Chart" />
                  <FormControlLabel value="BarChart" control={<Radio />} label="Stacked Bar Chart" />
                  <FormControlLabel value="ScatterChart" control={<Radio />} label="Scatter Plot" />
                  <FormControlLabel value="RadialBarChart" control={<Radio />} label="Radial Bar Chart" />
                </RadioGroup>
              </FormControl>
              <Button variant="contained" color="primary" fullWidth onClick={handleView}>
                View
              </Button>
            </Box>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={8}>
            {plotType === "AreaChart" ? (
              <AreaChart width={600} height={300} data={selectedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey={factor} fill="#8884d8" stroke="#8884d8" />
              </AreaChart>
            ) : plotType === "BarChart" ? (
              <BarChart width={600} height={300} data={selectedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="SnowAccumulation" stackId="a" fill="#8884d8" />
                <Bar dataKey="MeltwaterFlow" stackId="a" fill="#82ca9d" />
                <Bar dataKey="MassBalance" stackId="a" fill="#ffc658" />
              </BarChart>
            ) : plotType === "ScatterChart" ? (
              <ScatterChart width={600} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="SnowAccumulation" />
                <YAxis dataKey="MeltwaterFlow" />
                <Tooltip />
                <Scatter name="Meltwater vs Snowfall" data={selectedData} fill="#8884d8" />
              </ScatterChart>
            ) : (
              <RadialBarChart width={600} height={300} innerRadius="10%" outerRadius="80%" data={selectedData}>
                <RadialBar minAngle={15} label={{ position: "insideStart", fill: "#fff" }} background clockWise dataKey="MassBalance" />
                <Legend />
                <Tooltip />
              </RadialBarChart>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
