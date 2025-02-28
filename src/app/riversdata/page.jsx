// "use client";
// import Layout from "../components/layout";
// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import useDataFetcher from "../scripts/dataFetcher";
// import oneRiver from "../scripts/dataFetcher";
// import Image from "next/image";
// import LineImage from "./image.jpeg";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function RiversData() {
//   const [scale, setScale] = useState(1);
//   const formatDate = (dateString) => {
//     if (!dateString) return "";

//     // Handle both Date objects and ISO strings
//     const date = new Date(dateString);

//     // Check if date is valid
//     if (isNaN(date.getTime())) return dateString;

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   const [reach, setReach] = useState("Tarbela_to_Chashma");
//   const [startDate, setStartDate] = useState("1994-03-29");
//   const [endDate, setEndDate] = useState("1994-04-02");
//   const [rivSelection_tg, setRivSelection_tg] = useState("Pnj");
//   const [rivSelection_tc, setRivSelection_tc] = useState("Tarbela");
//   const [fetchCount, setFetchCount] = useState(0);
//   const [dateError, setDateError] = useState("");

//   const { data, error } = useDataFetcher(
//     reach,
//     startDate,
//     endDate,
//     rivSelection_tc,
//     rivSelection_tg,
//     fetchCount
//   );

//   const formatHeader = (key) => {
//     return key
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());
//   };

//   const getDateKey = () => {
//     switch (reach) {
//       case "Tarbela_to_Chashma":
//         return rivSelection_tc === "Tarbela" ? "Date" : "Chashma_Date";
//       case "Chashma_to_Taunsa":
//         return "Taunsa_Date";
//       case "Taunsa_to_Guddu":
//         return rivSelection_tg === "Pnj" ? "Pnj_Date" : "Guddu_Date";
//       case "Guddu_to_Sukkur":
//         return "Sukkur_Date";
//       case "Sukkur_to_Kotri":
//         return "Kotri_Date";
//       default:
//         return "Date";
//     }
//   };

//   const handleFetch = () => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (start > end) {
//       setDateError("End date cannot be before start date");
//       return;
//     }

//     // Optional: Add maximum date range validation
//     const diffTime = Math.abs(end - start);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     if (diffDays > 365) {
//       setDateError("Date range cannot exceed 1 year");
//       return;
//     }

//     setDateError("");
//     setFetchCount((prev) => prev + 1);
//   };

//   const dateKey = data.length > 0 ? getDateKey() : "";
//   const orderedKeys =
//     data.length > 0
//       ? [dateKey, ...Object.keys(data[0]).filter((key) => key !== dateKey)]
//       : [];

//   return (
//     <Layout>
//       <div className="max-h-96 overflow-y-scroll bg-white pb-2 pl-2 pr-2 rounded-lg shadow-md">
//         <div className="mt-2 pb-2 sticky top-0 flex bg-white flex-wrap gap-2 items-center">
//           <h2 className="text-xl font-bold text-gray-800">Rivers Data</h2>

//           {/* Date Inputs */}
//           <div className="flex gap-2">
//             <div className="flex flex-col">
//               <label htmlFor="startDate" className="text-sm text-gray-600">
//                 Start Date
//               </label>
//               <input
//                 id="startDate"
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white"
//                 max={endDate}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="endDate" className="text-sm text-gray-600">
//                 End Date
//               </label>
//               <input
//                 id="endDate"
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white"
//                 min={startDate}
//               />
//             </div>
//           </div>

//           {/* Reach Selector */}
//           <div className="flex flex-col">
//             <label htmlFor="reach" className="text-sm text-gray-600">
//               Reach
//             </label>
//             <select
//               id="reach"
//               className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
//               value={reach}
//               onChange={(e) => setReach(e.target.value)}
//             >
//               <option value="Tarbela_to_Chashma">Tarbela to Chashma</option>
//               <option value="Chashma_to_Taunsa">Chashma to Taunsa</option>
//               <option value="Taunsa_to_Guddu">Taunsa to Guddu</option>
//               <option value="Guddu_to_Sukkur">Guddu to Sukkur</option>
//               <option value="Sukkur_to_Kotri">Sukkur to Kotri</option>
//             </select>
//           </div>

//           {/* Additional Selectors */}
//           {reach === "Tarbela_to_Chashma" && (
//             <div className="flex flex-col">
//               <label
//                 htmlFor="rivSelection_tc"
//                 className="text-sm text-gray-600"
//               >
//                 Location
//               </label>
//               <select
//                 id="rivSelection_tc"
//                 className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
//                 value={rivSelection_tc}
//                 onChange={(e) => setRivSelection_tc(e.target.value)}
//               >
//                 <option value="Tarbela">Tarbela</option>
//                 <option value="Chashma">Chashma</option>
//               </select>
//             </div>
//           )}

//           {reach === "Taunsa_to_Guddu" && (
//             <div className="flex flex-col">
//               <label
//                 htmlFor="rivSelection_tg"
//                 className="text-sm text-gray-600"
//               >
//                 Location
//               </label>
//               <select
//                 id="rivSelection_tg"
//                 className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
//                 value={rivSelection_tg}
//                 onChange={(e) => setRivSelection_tg(e.target.value)}
//               >
//                 <option value="Pnj">Punjnad</option>
//                 <option value="Guddu">Guddu</option>
//               </select>
//             </div>
//           )}

//           {/* Fetch Button */}
//           <button
//             onClick={handleFetch}
//             className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 mt-5"
//           >
//             Fetch Data
//           </button>
//         </div>

//         {/* Error Messages */}
//         {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
//         {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}

//         {/* Data Table */}
//         {data.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-300 table-fixed">
//             <thead className="sticky top-10">
//               <tr className="bg-gray-200">
//                 {orderedKeys.map((key) => (
//                   <th
//                     key={key}
//                     className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300"
//                   >
//                     {formatHeader(key)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   {orderedKeys.map((key) => (
//                     <td
//                       key={key}
//                       className="px-2 py-1 border-b border-gray-300"
//                     >
//                       {key.toLowerCase().includes("date")
//                         ? formatDate(item[key])
//                         : item[key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="mt-2">No data available</p>
//         )}
//       </div>

//       <div className="flex justify-center my-5">
//         <div className="flex flex-col">
//           <label htmlFor="dateData" className="text-sm text-gray-600">
//             Date
//           </label>
//           <input
//             id="dateData"
//             type="date"
//             // value={startDate}
//             // onChange={(e) => setStartDate(e.target.value)}
//             className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white"
//             // max={endDate}
//           />
//           {/* Reach Selector */}
//           <div className="flex flex-col">
//             <label htmlFor="reach" className="text-sm text-gray-600">
//               Reach
//             </label>
//             <select
//               id="reach"
//               className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
//               value={reach}
//               onChange={(e) => setReach(e.target.value)}
//             >
//               <option value="Tarbela_to_Chashma">Tarbela to Chashma</option>
//               <option value="Chashma_to_Taunsa">Chashma to Taunsa</option>
//               <option value="Taunsa_to_Guddu">Taunsa to Guddu</option>
//               <option value="Guddu_to_Sukkur">Guddu to Sukkur</option>
//               <option value="Sukkur_to_Kotri">Sukkur to Kotri</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Image Component */}
//       <div className="flex justify-center mt-5">
//         <Image
//           src={LineImage}
//           alt="Schematic Diagram"
//           width={500 * scale} // Adjust width based on scale
//           height={500 * scale} // Adjust height based on scale
//           className="rounded-lg shadow-md z-10 absolute"
//         />
//         <p id="tarbela_US" className="z-30 translate-x-[-215px] translate-y-[117px] text-xs">
//           60,000
//         </p>
//       </div>
//     </Layout>
//   );
// }
"use client";
import Layout from "../components/layout";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useDataFetcher from "../scripts/dataFetcher";
import oneRiver from "../scripts/dataFetcher";
import Image from "next/image";
import LineImage from "./image.jpeg";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function RiversData() {
  const [scale, setScale] = useState(1);
  const [paragraphContent, setParagraphContent] = useState("60,000"); // State for paragraph content
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Handle both Date objects and ISO strings
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [reach, setReach] = useState("Tarbela_to_Chashma");
  const [startDate, setStartDate] = useState("1994-03-29");
  const [endDate, setEndDate] = useState("1994-04-02");
  const [rivSelection_tg, setRivSelection_tg] = useState("Pnj");
  const [rivSelection_tc, setRivSelection_tc] = useState("Tarbela");
  const [fetchCount, setFetchCount] = useState(0);
  const [dateError, setDateError] = useState("");

  const { data, error } = useDataFetcher(
    reach,
    startDate,
    endDate,
    rivSelection_tc,
    rivSelection_tg,
  );

  const [oneReach, setOneReach] = useState("Tarbela_to_Chashma");
  const [oneDate, setOneDate] = useState("1994-03-29");
  const [oneRivSelection_tg, setOneRivSelection_tg] = useState("Pnj");
  const [oneRivSelection_tc, setOneRivSelection_tc] = useState("Tarbela");

  const {oneData, oneError} = oneRiver(
    oneReach,
    oneDate,
    oneRivSelection_tc,
    oneRivSelection_tg
  );

  const formatHeader = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const getDateKey = () => {
    switch (reach) {
      case "Tarbela_to_Chashma":
        return rivSelection_tc === "Tarbela" ? "Date" : "Chashma_Date";
      case "Chashma_to_Taunsa":
        return "Taunsa_Date";
      case "Taunsa_to_Guddu":
        return rivSelection_tg === "Pnj" ? "Pnj_Date" : "Guddu_Date";
      case "Guddu_to_Sukkur":
        return "Sukkur_Date";
      case "Sukkur_to_Kotri":
        return "Kotri_Date";
      default:
        return "Date";
    }
  };

  const handleFetch = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setDateError("End date cannot be before start date");
      return;
    }

    // Optional: Add maximum date range validation
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 365) {
      setDateError("Date range cannot exceed 1 year");
      return;
    }

    setDateError("");
    setFetchCount((prev) => prev + 1);
  };

  const dateKey = data.length > 0 ? getDateKey() : "";
  const orderedKeys =
    data.length > 0
      ? [dateKey, ...Object.keys(data[0]).filter((key) => key !== dateKey)]
      : [];

  return (
    <Layout>
      <div className="max-h-96 overflow-y-scroll bg-white pb-2 pl-2 pr-2 rounded-lg shadow-md">
        <div className="mt-2 pb-2 sticky top-0 flex bg-white flex-wrap gap-2 items-center">
          <h2 className="text-xl font-bold text-gray-800">Rivers Data</h2>

          {/* Date Inputs */}
          <div className="flex gap-2">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-sm text-gray-600">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white"
                max={endDate}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-sm text-gray-600">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white"
                min={startDate}
              />
            </div>
          </div>

          {/* Reach Selector */}
          <div className="flex flex-col">
            <label htmlFor="reach" className="text-sm text-gray-600">
              Reach
            </label>
            <select
              id="reach"
              className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
              value={reach}
              onChange={(e) => setReach(e.target.value)}
            >
              <option value="Tarbela_to_Chashma">Tarbela to Chashma</option>
              <option value="Chashma_to_Taunsa">Chashma to Taunsa</option>
              <option value="Taunsa_to_Guddu">Taunsa to Guddu</option>
              <option value="Guddu_to_Sukkur">Guddu to Sukkur</option>
              <option value="Sukkur_to_Kotri">Sukkur to Kotri</option>
            </select>
          </div>

          {/* Additional Selectors */}
          {reach === "Tarbela_to_Chashma" && (
            <div className="flex flex-col">
              <label
                htmlFor="rivSelection_tc"
                className="text-sm text-gray-600"
              >
                Location
              </label>
              <select
                id="rivSelection_tc"
                className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
                value={rivSelection_tc}
                onChange={(e) => setRivSelection_tc(e.target.value)}
              >
                <option value="Tarbela">Tarbela</option>
                <option value="Chashma">Chashma</option>
              </select>
            </div>
          )}

          {reach === "Taunsa_to_Guddu" && (
            <div className="flex flex-col">
              <label
                htmlFor="rivSelection_tg"
                className="text-sm text-gray-600"
              >
                Location
              </label>
              <select
                id="rivSelection_tg"
                className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
                value={rivSelection_tg}
                onChange={(e) => setRivSelection_tg(e.target.value)}
              >
                <option value="Pnj">Punjnad</option>
                <option value="Guddu">Guddu</option>
              </select>
            </div>
          )}

          {/* Fetch Button */}
          <button
            onClick={handleFetch}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 mt-5"
          >
            Fetch Data
          </button>
        </div>

        {/* Error Messages */}
        {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
        {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}

        {/* Data Table */}
        {data.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 table-fixed">
            <thead className="sticky top-10">
              <tr className="bg-gray-200">
                {orderedKeys.map((key) => (
                  <th
                    key={key}
                    className="px-2 py-1 text-left text-sm font-semibold text-gray-800 border-b border-gray-300"
                  >
                    {formatHeader(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {orderedKeys.map((key) => (
                    <td
                      key={key}
                      className="px-2 py-1 border-b border-gray-300"
                    >
                      {key.toLowerCase().includes("date")
                        ? formatDate(item[key])
                        : item[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-2">No data available</p>
        )}
      </div>

      <div className="flex justify-center my-5">
        <div className="flex flex-col">
          <label htmlFor="dateData" className="text-sm text-gray-600">
            Date
          </label>
          <input
            id="dateData"
            type="date"
            // value={startDate}
            // onChange={(e) => setStartDate(e.target.value)}
            className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white"
            // max={endDate}
          />
          {/* Reach Selector */}
          <div className="flex flex-col">
            <label htmlFor="reach" className="text-sm text-gray-600">
              Reach
            </label>
            <select
              id="reach"
              className="bg-slate-300 p-1 rounded-lg focus:ring focus:bg-white cursor-pointer"
              value={reach}
              onChange={(e) => setReach(e.target.value)}
            >
              <option value="Tarbela_to_Chashma">Tarbela to Chashma</option>
              <option value="Chashma_to_Taunsa">Chashma to Taunsa</option>
              <option value="Taunsa_to_Guddu">Taunsa to Guddu</option>
              <option value="Guddu_to_Sukkur">Guddu to Sukkur</option>
              <option value="Sukkur_to_Kotri">Sukkur to Kotri</option>
            </select>
          </div>
        </div>
      </div>

      {/* Image Component */}
      <div className="flex justify-center mt-5">
        <Image
          src={LineImage}
          alt="Schematic Diagram"
          width={500 * scale} // Adjust width based on scale
          height={500 * scale} // Adjust height based on scale
          className="rounded-lg shadow-md z-10 absolute"
        />
        <p className="z-30 translate-x-[-215px] translate-y-[117px] text-xs">
          {paragraphContent}
          {oneData.tarbela_US}
        </p>
        <p>
          {oneData.tarbela_DS}
        </p>
      </div>

      {/* Button to update paragraph content */}
      <div className="flex justify-center mt-5 z-50 absolute">
        <button
          onClick={() => setParagraphContent("Updated Value")}
          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
        >
          Update Paragraph
        </button>
      </div>
    </Layout>
  );
}