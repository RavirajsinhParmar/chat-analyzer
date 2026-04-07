import React from "react";

const Users = ({ users }) => {
  return (
    <div className="max-w-5xl mt-4 mx-auto bg-gray-50 p-6 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">Consistent Users</h2>
      <div className="rounded-xl flex flex-col">
        {users.map((u, i) => (
          <div
            key={u}
            className="bg-white flex items-center justify-between p-3 mb-2 hover:bg-blue-100 rounded-xl transition"
          >
            <span className="text-gray-700 font-medium">{u}</span>
            <span className="text-xs text-gray-400">#{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
