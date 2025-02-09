// "use client";
// import Layout from "../components/layout";
// import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// function lengthOfObject(obj, index) {
//   return Object.keys(obj[index]).filter((key) => key !== "__proto__");
// }
// export default function RiversData() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedRegion, setSelectedRegion] = useState("Tarbela");

//   // Function to fetch data with a specified query
//   const fetchData = async (query, parameters = {}) => {
//     try {
//       console.log("Fetching data with query:", query);
//       const response = await fetch("/api/neo4j", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query, parameters }),
//       });

//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);
//       const result = await response.json();
//       setData(result);
//       setError(null); // Clear any previous error
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError(err.message);
//       setData([]); // Clear previous data if there's an error
//     }
//   };

//   useEffect(() => {
//     setData([]);  
//     if (selectedRegion === "Tarbela") {
//       const query = `
//         MATCH (d:Tarbela) RETURN(d) LIMIT 11
//       `;
//       fetchData(query);
//     } else if (selectedRegion === "Chashma") {
//       const query = `
//         MATCH (d:Chashma) RETURN(d) LIMIT 11
//       `;
//       fetchData(query);
//     }
//   }, [selectedRegion]);

//   const chartData = {
//     labels: data.map(item => item.date),
//     datasets: [
//       {
//         label: selectedRegion === "Tarbela" ? "Tarbela Outflows" : "Chashma Upstream",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.tarbela_outflows?.low : item.Chashma_upstream?.low),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//       {
//         label: selectedRegion === "Tarbela" ? "Kabul River" : "Loss and Gain",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.kabul_river?.low : item.Loss_and_Gain?.low),
//         backgroundColor: "rgba(153, 102, 255, 0.6)",
//       },
//       {
//         label: selectedRegion === "Tarbela" ? "Thal Canal" : "Chashma Downstream",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.thal_canal?.low : item.Chashma_downstream?.low),
//         backgroundColor: "rgba(255, 159, 64, 0.6)",
//       },
//       {
//         label: selectedRegion === "Tarbela" ? "Bal For Chashma" : "",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.bal_for_chashma?.low : null),
//         backgroundColor: "rgba(255, 206, 86, 0.6)",
//       },
//     ].filter(dataset => dataset.data.some(value => value !== null)),
//   };
//   return (
//     <Layout>
//       {/* Table Section */}
//       <div className="max-h-96 overflow-y-scroll bg-white pb-2 pl-2 pr-2 rounded-lg shadow-md">
//         <div className="mt-2 pb-2 sticky top-0 flex bg-white">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Rivers Data</h2>
//           {/* Dropdown to select region */}
//           <select
//             className="mb-2 ml-5 bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
//             name="regions"
//             id="regions"
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
//           >
//             <option value="Tarbela">Tarbela</option>
//             <option value="Chashma">Chashma</option>
//           </select>
//           {/* Error display */}
//           {error && <p style={{ color: "red" }}>Error: {error}</p>}
//         </div>
//         {/* Data display */}
//         {selectedRegion === "Tarbela" && (
//           <table className="min-w-full bg-white border border-gray-300 table-fixed">
//             <thead className="sticky top-10">
//               <tr className="bg-gray-200">
//                 <th className="datess px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Date
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Tarbela Outflows
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Kabul River
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Thal Canal
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Bal For Chashma
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                   {`${item.date.day.low}/${item.date.month.low}/${item.date.year.low}`}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.tarbela_outflows?.low ?? "N/A"}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.kabul_river?.low ?? "N/A"}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.thal_canal?.low ?? "N/A"}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.bal_for_chashma?.low ?? "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {selectedRegion === "Chashma" && (
//             <table className="min-w-full bg-white border border-gray-300 table-fixed">
//             <thead className="sticky top-10">
//               <tr className="bg-gray-200">
//                 <th className="datess px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Date
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Chashma_upstream
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Loss_and_Gain
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   Chashma_downstream
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                   {`${item.date.day.low}/${item.date.month.low}/${item.date.year.low}`}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.Chashma_upstream?.low ?? "N/A"}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.Loss_and_Gain?.low ?? "N/A"}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {item.Chashma_downstream?.low ?? "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <div className="w-1/2">
//         <Bar data={chartData} />
//       </div>
//     </Layout>
//   );
// }

// "use client";
// import Layout from "../components/layout";
// import React, { useState } from "react";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import useDataFetcher from "../scripts/dataFetcher";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// export default function RiversData() {
//   const [query, setQuery] = useState("SELECT * From barrage");
//   const [selectedRegion, setSelectedRegion] = useState("Tarbela");

//   const handleButtonAClick = (barrageName) => {
//     setQuery(`SELECT * from barrage where Name = 'Barrage ${barrageName}'`);
//   };

//   const { data, error } = useDataFetcher(query); // Using the hook

//   const chartData = {
//     labels: data.map(item => `${item.name}`),
//     datasets: [
//       {
//         label: selectedRegion === "Tarbela" ? "Tarbela Outflows" : "Chashma Upstream",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.tarbela_outflows : item.chashma_upstream),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//       {
//         label: selectedRegion === "Tarbela" ? "Kabul River" : "Loss and Gain",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.kabul_river : item.loss_and_gain),
//         backgroundColor: "rgba(153, 102, 255, 0.6)",
//       },
//       {
//         label: selectedRegion === "Tarbela" ? "Thal Canal" : "Chashma Downstream",
//         data: data.map(item => selectedRegion === "Tarbela" ? item.thal_canal : item.chashma_downstream),
//         backgroundColor: "rgba(255, 159, 64, 0.6)",
//       },
//     ].filter(dataset => dataset.data.some(value => value !== null)),
//   };

//   return (
//     <Layout>
//       {/* Table Section */}
//       <div className="max-h-96 overflow-y-scroll bg-white pb-2 pl-2 pr-2 rounded-lg shadow-md">
//         <div className="mt-2 pb-2 sticky top-0 flex bg-white">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Rivers Data</h2>
//           <select
//             className="mb-2 ml-5 bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
//             value={selectedRegion}
//             onChange={(e) => handleButtonAClick('A')}
//           >
//             <option value="Tarbela">Tarbela</option>
//             <option value="Chashma">Chashma</option>
//           </select>
//           {error && <p style={{ color: "red" }}>Error: {error}</p>}
//         </div>
//         {data.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-300 table-fixed">
//             <thead className="sticky top-10">
//               <tr className="bg-gray-200">
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Date</th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   {selectedRegion === "Tarbela" ? "Tarbela Outflows" : "Chashma Upstream"}
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   {selectedRegion === "Tarbela" ? "Kabul River" : "Loss and Gain"}
//                 </th>
//                 <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
//                   {selectedRegion === "Tarbela" ? "Thal Canal" : "Chashma Downstream"}
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {`${item.Name}`}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {selectedRegion === "Tarbela" ? item.name : item.chashma_upstream}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {selectedRegion === "Tarbela" ? item.kabul_river : item.loss_and_gain}
//                   </td>
//                   <td className="px-2 py-1 border-b border-gray-300">
//                     {selectedRegion === "Tarbela" ? item.thal_canal : item.chashma_downstream}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//       <div className="w-1/2">
//         <Bar data={chartData} />
//       </div>
//     </Layout>
//   );
// }
"use client";
import Layout from "../components/layout";
import React, { useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import useDataFetcher from "../scripts/dataFetcher";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function RiversData() {
  const [reach, setReach] = useState("Tarbela_to_Chashma");
  const [startDate, setStartDate] = useState("1994-03-29"); // Example start date
  const [endDate, setEndDate] = useState("1994-04-02"); // Example end date
  const [rivSelection, setRivSelection] = useState("Pnj"); // Example river selection

  const { data, error } = useDataFetcher(reach, startDate, endDate, rivSelection);

  const chartData = {
    labels: data.map(item => `${item.name}`),
    datasets: [
      {
        label: reach === "Tarbela" ? "Tarbela Outflows" : "Chashma Upstream",
        data: data.map(item => reach === "Tarbela" ? item.tarbela_outflows : item.chashma_upstream),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: reach === "Tarbela" ? "Kabul River" : "Loss and Gain",
        data: data.map(item => reach === "Tarbela" ? item.kabul_river : item.loss_and_gain),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: reach === "Tarbela" ? "Thal Canal" : "Chashma Downstream",
        data: data.map(item => reach === "Tarbela" ? item.thal_canal : item.chashma_downstream),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ].filter(dataset => dataset.data.some(value => value !== null)),
  };

  return (
    <Layout>
      {/* Table Section */}
      <div className="max-h-96 overflow-y-scroll bg-white pb-2 pl-2 pr-2 rounded-lg shadow-md">
        <div className="mt-2 pb-2 sticky top-0 flex bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Rivers Data</h2>
          <select
            className="mb-2 ml-5 bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
            value={reach}
            onChange={(e) => setReach(e.target.value)}
          >
            <option value="Tarbela_to_Chashma">Tarbela</option>
            <option value="Chashma">Chashma</option>
          </select>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
        {data.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 table-fixed">
            <thead className="sticky top-10">
              <tr className="bg-gray-200">
                <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">Date</th>
                <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
                  {reach === "Tarbela_to_Chashma" ? "Tarbela Outflows" : "Chashma Upstream"}
                </th>
                <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
                  {reach === "Tarbela_to_Chashma" ? "Kabul River" : "Loss and Gain"}
                </th>
                <th className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300">
                  {reach === "Tarbela_to_Chashma" ? "Thal Canal" : "Chashma Downstream"}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 border-b border-gray-300">
                    {`${item.Name}`}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    {reach === "Tarbela_to_Chashma" ? item.Date : item.Tarbela_Outflows}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    {reach === "Tarbela_to_Chashma" ? item.kabul_river : item.loss_and_gain}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-300">
                    {reach === "Tarbela_to_Chashma" ? item.thal_canal : item.chashma_downstream}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="w-1/2">
        <Bar data={chartData} />
      </div>
    </Layout>
  );
}