// src/components/user/DonationGuideSidebar.jsx
import React from 'react';
import { BookOpen, Heart, Droplet, Coffee, Moon, ShieldAlert, Watch } from 'lucide-react';

const GuideItem = ({ icon: Icon, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600">
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <div className="ml-4">
            <h4 className="text-md font-bold text-gray-800">{title}</h4>
            <p className="mt-1 text-sm text-gray-600">{children}</p>
        </div>
    </div>
);

const DonationGuideSidebar = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200 sticky top-24">
            <div className="flex items-center mb-5">
                <BookOpen className="w-8 h-8 text-red-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Cẩm nang hiến máu</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Trước khi hiến máu</h3>
                    <div className="space-y-4">
                        <GuideItem icon={Heart} title="Ăn nhẹ & Uống nhiều nước">
                            Ăn một bữa ăn lành mạnh và uống thêm khoảng 500ml nước hoặc nước trái cây trước khi hiến máu.
                        </GuideItem>
                        <GuideItem icon={Moon} title="Ngủ đủ giấc">
                            Đảm bảo bạn có một đêm ngon giấc trước ngày đi hiến máu.
                        </GuideItem>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Trong khi hiến máu</h3>
                    <div className="space-y-4">
                        <GuideItem icon={Watch} title="Thư giãn & Hít thở sâu">
                            Quá trình lấy máu chỉ mất khoảng 8-10 phút. Hãy thư giãn, nghe nhạc hoặc đọc sách.
                        </GuideItem>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sau khi hiến máu</h3>
                    <div className="space-y-4">
                        <GuideItem icon={Coffee} title="Nghỉ ngơi và bổ sung năng lượng">
                            Nghỉ tại chỗ 10-15 phút, thưởng thức đồ ăn nhẹ được cung cấp để cơ thể phục hồi.
                        </GuideItem>
                        <GuideItem icon={ShieldAlert} title="Tránh hoạt động mạnh">
                            Không nâng vật nặng hoặc tập thể dục cường độ cao trong phần còn lại của ngày.
                        </GuideItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationGuideSidebar;