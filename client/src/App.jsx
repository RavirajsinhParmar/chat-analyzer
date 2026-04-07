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
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-center">WhatsApp Chat Analyzer</h1>
      <FileDropzone onFileUpload={upload} loading={loading} />
      {file && (
        <div className="max-w-5xl mx-auto mt-4 bg-white border rounded-xl shadow-sm p-4 flex items-center justify-between">
          {/* Left: File Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
              📄
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {loading && (
              <span className="text-xs text-gray-500">Uploading...</span>
            )}

            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={() => {
                setFile(null);
                setData([]);
                setUsers([]);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
      {data?.length ? (
        <AnalysisChart data={data} />
      ) : (
        file &&
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
