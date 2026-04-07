import React from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const AnalysisChart = ({ data }) => {
  return (
    <div className="w-full mt-6 flex justify-center h-600">
      <BarChart width={1100} height={600} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="active" fill="#60a5fa" />
        <Bar dataKey="joined" fill="#f97316" />
      </BarChart>
    </div>
  );
};

export default AnalysisChart;
