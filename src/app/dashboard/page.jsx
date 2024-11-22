"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { Chart } from "chart.js/auto";
import { FaTemperatureHigh, FaCloudRain, FaSnowflake, FaMountain } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Ensure Marker and Popup are imported
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('Tarbela');

  // Function to fetch data with a specified query
  const fetchData = async (query, parameters = {}) => {
    try {
      console.log('Fetching data with query:', query);
      const response = await fetch('/api/neo4j', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, parameters }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      setData(result);
      console.log('Data fetched:', result);
      setError(null);  // Clear any previous error
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      setData([]);  // Clear previous data if there's an error
    }
  };

  useEffect(() => {
    if (selectedRegion === 'Tarbela') {
      const query = `
        MATCH (d:Record) RETURN(d) LIMIT 10
      `;
      fetchData(query);
    }
  }, [selectedRegion]);

  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    myChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2020", "2021", "2022", "2023"], // Sample years
        datasets: [
          {
            label: "Metric 1",
            data: [12, 19, 3, 5], // Sample data
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
          {
            label: "Metric 2",
            data: [2, 29, 5, 10], // Sample data
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Layout>
      <div className="p-3 bg-gray-100 min-h-screen ">
        {/* Data Overview with Icons */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Precipitation Box */}
          <div className="bg-green-100 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaCloudRain className="text-3xl text-green-700" />
            <h2 className="text-lg font-semibold text-green-700 mt-2">Precipitation</h2>
            <p className="text-sm text-gray-600">01-Jan-2000 to 27-Feb-2024</p>
          </div>

          {/* Temperature Box */}
          <div className="bg-orange-100 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaTemperatureHigh className="text-3xl text-orange-700" />
            <h2 className="text-lg font-semibold text-orange-700 mt-2">Temperature</h2>
            <p className="text-sm text-gray-600">04-Mar-2002 to 30-Aug-2021</p>
          </div>

          {/* SCA Box */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaSnowflake className="text-3xl text-blue-700" />
            <h2 className="text-lg font-semibold text-blue-700 mt-2">SCA</h2>
            <p className="text-sm text-gray-600">26-Feb-2000 to 20-Feb-2024</p>
          </div>

          {/* Glacier Box */}
          <div className="bg-teal-100 p-4 rounded-lg shadow-md flex flex-col items-center">
            <FaMountain className="text-3xl text-teal-700" />
            <h2 className="text-lg font-semibold text-teal-700 mt-2">Glacier</h2>
            <p className="text-sm text-gray-600">26-Feb-2000 to 20-Feb-2024</p>
          </div>
        </div>

        {/* Table and Chart Section (Side by Side) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Table Section */}
          <div className="max-h-96 overflow-y-scroll bg-white pb-2 pl-2 pr-2 rounded-lg shadow-md">
            <div className="mt-2 sticky top-0 flex justify-between bg-white">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Tarbela Data</h2>
              {/* Dropdown to select region */}
              <select
                className="mb-2 bg-slate-300 p-2 rounded-lg focus:ring focus:bg-white "
                name="regions"
                id="regions"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="Tarbela">Tarbela</option>
                <option value="Kabul">Kabul</option>
              </select>
              {/* Error display */}
              {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>
            {/* Data display */}
            <table className="min-w-full bg-white border border-gray-300 table-fixed">
              <thead className="sticky top-10">
                <tr className="bg-gray-200">
                  <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Date</th>
                  <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Tarbela Outflows</th>
                  <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Kabul River</th>
                  <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Thal Canal</th>
                  <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Bal For Chashma</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1 border-b border-gray-300">{item.date}</td>
                    <td className="px-2 py-1 border-b border-gray-300">{item.tarbela_outflows.low}</td>
                    <td className="px-2 py-1 border-b border-gray-300">{item.kabul_river.low}</td>
                    <td className="px-2 py-1 border-b border-gray-300">{item.thal_canal.low}</td>
                    <td className="px-2 py-1 border-b border-gray-300">{item.bal_for_chashma.low}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Data Overview Chart</h2>
            <canvas ref={chartRef} id="myChart" className="w-full h-64"></canvas>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">World Map Overview</h2>
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Add Marker */}
            <Marker position={[20, 0]}>
              <Popup>Indus JC zone.<br /> Easily customizable.</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </Layout>
  );
}