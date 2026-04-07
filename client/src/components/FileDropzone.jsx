import React from "react";
import { useDropzone } from "react-dropzone";
import Loader from "../common/Loader";

export default function FileDropzone({ onFileUpload, loading }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`max-w-5xl mt-4 mx-auto bg-gray-50 p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition 
        ${
          isDragActive
            ? "bg-blue-100 border-blue-400"
            : "bg-gray-50 border-gray-300"
        }`}
    >
      <input {...getInputProps()} />

      {loading ? (
        <Loader />
      ) : isDragActive ? (
        <p className="text-blue-600 font-medium">Drop the file here...</p>
      ) : (
        <div>
          <p className="text-gray-700 font-medium">
            Drag & drop your WhatsApp chat file here
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to browse (.txt only)
          </p>
        </div>
      )}
    </div>
  );
}
