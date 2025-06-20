import React from 'react';

const UserManagementTable = ({ users = [] }) => (
  <table className="w-full border">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 text-left">Name</th>
        <th className="p-2 text-left">Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map(u => (
        <tr key={u.id} className="border-t">
          <td className="p-2">{u.fullName}</td>
          <td className="p-2">{u.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserManagementTable;
