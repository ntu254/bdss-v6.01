import React from 'react';

const UserProfileSidebar = ({ user }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="font-bold text-lg mb-2">{user.fullName}</h2>
    <p className="text-sm text-gray-600">{user.email}</p>
  </div>
);

export default UserProfileSidebar;
