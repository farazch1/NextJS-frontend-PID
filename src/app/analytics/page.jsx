"use client";
import React from 'react';
import Layout from "../components/layout";
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// Sample data for the charts (adjusted for irrigation department analytics)
const barChartData = [
  { name: 'January', waterUsed: 5000 },
  { name: 'February', waterUsed: 4500 },
  { name: 'March', waterUsed: 6000 },
  { name: 'April', waterUsed: 8000 },
  { name: 'May', waterUsed: 7000 },
  { name: 'June', waterUsed: 8500 },
  { name: 'July', waterUsed: 9500 },
];

const pieChartData = [
  { name: 'Canal A', value: 4000 },
  { name: 'Canal B', value: 3000 },
  { name: 'Canal C', value: 2500 },
  { name: 'Canal D', value: 1500 },
];

// Define colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics() {
  return (
    <Layout>
      <Box sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
        {/* Title Section */}
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Irrigation Department Analytics
        </Typography>

        {/* Bar Chart Section */}
        <Paper sx={{ padding: 3, marginBottom: 4, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Upstream & Downstream Data (in Cubic Meters)
          </Typography>
          <BarChart
            width={600}
            height={300}
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="waterUsed" fill="#8884d8" />
          </BarChart>
        </Paper>

        {/* Pie Chart Section */}
        <Paper sx={{ padding: 3, marginBottom: 4, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Water Usage Distribution by Canal
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Paper>

        {/* Insights Section */}
        <Paper sx={{ padding: 3, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Insights and Recommendations
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={<strong>Water Usage Trends:</strong>}
                secondary="From January to July, water usage has steadily increased, with July being the month of highest consumption. This could be attributed to seasonal demands. A review of irrigation scheduling can help optimize usage."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Regions with High Consumption:</strong>}
                secondary="Canal A and Canal B account for the highest water consumption. Canal A, in particular, is using a disproportionate amount of the available water. A detailed audit of the irrigation systems could identify inefficiencies."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Optimization Opportunities:</strong>}
                secondary="Focus on optimizing water usage in Canal C and Canal D, where consumption is relatively lower but could be increased with better distribution. Additionally, investigating newer irrigation technologies like drip irrigation could help reduce overall usage."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Seasonal Variation:</strong>}
                secondary="During the peak months (April to June), water usage spikes significantly. Proper scheduling and water-saving techniques can mitigate the impact of these spikes, ensuring water is available for all regions during high-demand periods."
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Layout>
  );
}
