import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-medium">
          Analyzing WhatsApp chat...
        </p>
      </div>
    </div>
  );
};

export default Loader;
