// src/components/dashboard/DashboardStatCard.jsx
import React from 'react';

const DashboardStatCard = ({ title, value, description, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                {Icon && <Icon className="h-6 w-6 text-gray-400" />}
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <p className="text-xs text-gray-500 mt-4">{description}</p>
    </div>
);

export default DashboardStatCard;