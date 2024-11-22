"use client";
import Layout from "../../components/layout";
import { FaTemperatureHigh, FaCloudRain, FaSnowflake, FaMountain,FaLeaf } from "react-icons/fa";
export default function KharifForecast() {
    
    
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
                <FaLeaf className="text-3xl text-blue-700" />
                <h2 className="text-lg font-semibold text-blue-700 mt-2">Soil Carbon Area</h2>
                <p className="text-sm text-gray-600">01-Jan-2000 to 27-Feb-2024</p>
            </div>
        </div>
        </div>
        </Layout>
            );
}