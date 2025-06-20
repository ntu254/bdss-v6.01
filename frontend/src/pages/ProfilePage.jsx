// pages/ProfilePage.jsx - User profile page
import React, { useState } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useApi, useAsyncApi } from '../hooks/useApi';
import userService from '../services/userService';
import { Container } from '../components';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/common/Button';
import Input from '../components/forms/Input';
import Select from '../components/forms/Select';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
    const { data: profile, loading, error, refetch } = useApi(userService.getMyProfile);
  const { loading: updating, execute: updateProfile } = useAsyncApi();

  const handleEdit = () => {
    setFormData({
      gender: profile?.gender || '',
      emergencyContact: profile?.emergencyContact || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };
  const handleSave = async () => {
    try {
      await updateProfile(userService.updateMyProfile, formData);
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Có lỗi xảy ra khi tải thông tin profile</p>
          <Button onClick={refetch}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
            <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-red-500" />
                      Thông tin cá nhân
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        iconLeft={<Edit className="w-4 h-4" />}
                      >
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleSave}
                          isLoading={updating}
                          iconLeft={<Save className="w-4 h-4" />}
                        >
                          Lưu
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                          iconLeft={<X className="w-4 h-4" />}
                        >
                          Hủy
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên
                      </label>
                      <p className="text-gray-900">{profile?.fullName}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">{profile?.email}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <p className="text-gray-900">{profile?.phone}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày sinh
                      </label>
                      <p className="text-gray-900">
                        {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                      </p>
                    </div>
                    
                    <div>
                      {isEditing ? (
                        <Select
                          label="Giới tính"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          options={[
                            { value: 'Male', label: 'Nam' },
                            { value: 'Female', label: 'Nữ' },
                            { value: 'Other', label: 'Khác' }
                          ]}
                        />
                      ) : (
                        <>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Giới tính
                          </label>
                          <p className="text-gray-900">
                            {profile?.gender === 'Male' ? 'Nam' : 
                             profile?.gender === 'Female' ? 'Nữ' : 
                             profile?.gender === 'Other' ? 'Khác' : 'Chưa cập nhật'}
                          </p>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nhóm máu
                      </label>                      <p className="font-semibold text-red-600">
                        {profile?.bloodType?.bloodGroup} ({profile?.bloodType?.componentType})
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ
                    </label>
                    <p className="text-gray-900">{profile?.address}</p>
                  </div>
                  
                  <div>
                    {isEditing ? (
                      <Input
                        label="Liên hệ khẩn cấp"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="VD: Mẹ - 0905111222"
                      />
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Liên hệ khẩn cấp
                        </label>
                        <p className="text-gray-900">{profile?.emergencyContact || 'Chưa cập nhật'}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái tài khoản</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vai trò</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {user?.role}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email xác thực</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile?.emailVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {profile?.emailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sẵn sàng hiến máu</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile?.isReadyToDonate 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {profile?.isReadyToDonate ? 'Sẵn sàng' : 'Không sẵn sàng'}
                      </span>
                    </div>
                    
                    {profile?.lastDonationDate && (
                      <div>
                        <span className="text-sm text-gray-600">Lần hiến máu cuối</span>
                        <p className="text-sm font-medium">
                          {new Date(profile.lastDonationDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="primary" size="sm" className="w-full">
                      Đăng ký hiến máu
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Lịch sử hiến máu
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Đổi mật khẩu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
