import React from 'react';
import PageHeader from '../../components/layouts/PageHeader';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/common/Button';
import { Package } from 'lucide-react';

const StaffInventoryPage = () => {
    // Dữ liệu này sẽ được fetch từ API
    const inventory = [
        { id: 'A+', units: 45, capacity: 100, lastUpdated: 'May 10, 2023' },
        { id: 'A-', units: 12, capacity: 50, lastUpdated: 'May 8, 2023' },
        { id: 'B+', units: 28, capacity: 80, lastUpdated: 'May 12, 2023' },
        { id: 'B-', units: 8, capacity: 40, lastUpdated: 'May 5, 2023' },
        { id: 'AB+', units: 15, capacity: 30, lastUpdated: 'May 11, 2023' },
        { id: 'AB-', units: 5, capacity: 20, lastUpdated: 'May 7, 2023' },
        { id: 'O+', units: 60, capacity: 120, lastUpdated: 'May 13, 2023' },
        { id: 'O-', units: 18, capacity: 60, lastUpdated: 'May 9, 2023' },
    ];

    const getStatus = (units, capacity) => {
        const percentage = (units / capacity) * 100;
        if (percentage < 25) return { text: 'Low', variant: 'destructive' };
        return { text: 'Adequate', variant: 'success' };
    };

    return (
        <div className="space-y-6">
            <PageHeader title="Kho máu" subtitle="Theo dõi và quản lý nguồn cung cấp máu" />
            <div className="bg-white p-6 rounded-lg shadow-soft border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Package className="mr-2" />
                    Nguồn cung hiện tại
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr className="border-b">
                                <th className="px-4 py-3 font-medium">Loại máu</th>
                                <th className="px-4 py-3 font-medium">Đơn vị có sẵn</th>
                                <th className="px-4 py-3 font-medium">Sức chứa</th>
                                <th className="px-4 py-3 font-medium">Trạng thái</th>
                                <th className="px-4 py-3 font-medium">Cập nhật lần cuối</th>
                                <th className="px-4 py-3 font-medium text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inventory.map(item => {
                                const status = getStatus(item.units, item.capacity);
                                return (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 font-bold text-lg text-red-600">{item.id}</td>
                                        <td className="px-4 py-3">{item.units}</td>
                                        <td className="px-4 py-3">{item.capacity}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={status.variant}>{status.text}</Badge>
                                        </td>
                                        <td className="px-4 py-3">{item.lastUpdated}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Button variant="outline" size="sm">Cập nhật</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffInventoryPage;