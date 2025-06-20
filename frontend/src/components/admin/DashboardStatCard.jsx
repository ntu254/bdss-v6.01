// src/components/admin/DashboardStatCard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'; //
import { cn } from '../../utils/cn'; //

const DashboardStatCard = ({ title, value, description, icon: Icon, className = '' }) => {
    return (
        <Card className={cn("shadow-soft", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
                {Icon && <Icon className="h-5 w-5 text-gray-400" />}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-gray-800">{value}</div>
                <p className="text-xs text-gray-500">{description}</p>
            </CardContent>
        </Card>
    );
};

export default DashboardStatCard;