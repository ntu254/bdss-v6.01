import React from 'react';

const DashboardStatCard = ({ title, value }) => (
  <div className="p-4 bg-white rounded shadow">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default DashboardStatCard;
