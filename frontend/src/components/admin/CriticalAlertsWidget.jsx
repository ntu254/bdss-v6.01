// src/components/admin/CriticalAlertsWidget.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../common/Button';

// --- DỮ LIỆU GIẢ LẬP ĐÃ ĐƯỢC VIỆT HÓA ---
const alerts = [
    {
        id: 1,
        type: 'critical',
        title: 'Nguồn cung máu O- thấp',
        message: 'Nhóm máu O- đang ở mức cực kỳ thấp (15% ngưỡng tối thiểu). Cần hành động ngay lập tức.'
    },
    {
        id: 2,
        type: 'warning',
        title: 'Yêu cầu Bảo trì Hệ thống',
        message: 'Lịch bảo trì dự kiến sẽ diễn ra trong 2 ngày tới. Vui lòng xem lại và xác nhận.'
    },
];

const alertStyles = {
    critical: { bg: 'bg-red-50', border: 'border-red-500', iconColor: 'text-red-600', buttonVariant: 'primary' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-500', iconColor: 'text-yellow-600', buttonVariant: 'secondary' }
};

const CriticalAlertsWidget = () => {
    if (alerts.length === 0) return null;

    return (
        <Card className="col-span-1 md:col-span-2 shadow-soft">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    Cảnh báo Quan trọng
                </CardTitle>
                <p className="text-sm text-gray-500">Các vấn đề cần được chú ý ngay lập tức</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {alerts.map(alert => {
                    const styles = alertStyles[alert.type];
                    return (
                        <div key={alert.id} className={`${styles.bg} border-l-4 ${styles.border} p-4 rounded-r-lg`}>
                            <div className="flex items-start">
                                <AlertTriangle className={`flex-shrink-0 h-5 w-5 ${styles.iconColor}`} />
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-semibold text-gray-800">{alert.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                                    <Button size="sm" variant={styles.buttonVariant} className="mt-2">
                                        {alert.type === 'critical' ? 'Hành động' : 'Xem lại'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    );
};

export default CriticalAlertsWidget;