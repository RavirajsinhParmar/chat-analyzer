import React, { useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import FileDropzone from "./components/FileDropzone";
import Users from "./components/Users";
import AnalysisChart from "./components/AnalysisChart";

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const upload = (file) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        setFile(file);
        const form = new FormData();
        form.append("file", file);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/upload`,
          form,
        );
        setData(res.data.chart);
        setUsers(res.data.consistentUsers);
        setLoading(false);
      } catch (error) {
        console.error("Upload error:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-center">WhatsApp Chat Analyzer</h1>
      {!file ? (
        <FileDropzone onFileUpload={upload} loading={loading} />
      ) : data?.length ? (
        <AnalysisChart data={data} />
      ) : (
        !loading && (
          <div className="p-12 mt-4 bg-slate-100 flex justify-center rounded-xl">
            No data found. Please upload text file of your chat..!
          </div>
        )
      )}

      {users?.length > 0 && <Users users={users} />}
    </div>
  );
}
