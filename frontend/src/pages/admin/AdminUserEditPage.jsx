import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

import userService from '../../services/userService';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminUserEditPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        emergencyContact: '',
        bloodTypeId: '',
        medicalConditions: '',
        lastDonationDate: '',
        isReadyToDonate: true,
        roleName: '', // Sẽ dùng để tìm roleId khi submit
        status: '',
        emailVerified: false,
        phoneVerified: false,
    });
    const [roles, setRoles] = useState([]);
    const [bloodTypes, setBloodTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const fetchUserData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Lấy đồng thời dữ liệu user, roles và blood types
            const [userData, rolesData, bloodTypesData] = await Promise.all([
                userService.getUserByIdForAdmin(userId),
                userService.getRoles(), // API này cần mock handler để hoạt động
                userService.getBloodTypes()
            ]);

            setUser(userData);
            const validRoles = Array.isArray(rolesData) ? rolesData : [];
            const validBloodTypes = Array.isArray(bloodTypesData) ? bloodTypesData : [];
            setRoles(validRoles);
            setBloodTypes(validBloodTypes);

            // --- FIX: Tìm bloodTypeId từ bloodTypeDescription ---
            let foundBloodTypeId = '';
            if (userData.bloodTypeDescription && validBloodTypes.length > 0) {
                const matchingBloodType = validBloodTypes.find(
                    bt => bt.description === userData.bloodTypeDescription
                );
                if (matchingBloodType) {
                    foundBloodTypeId = matchingBloodType.id;
                }
            }

            // Khởi tạo dữ liệu cho form
            setFormData({
                fullName: userData.fullName || '',
                phone: userData.phone || '',
                // --- FIX: Định dạng lại ngày tháng cho input type="date" ---
                dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '',
                gender: userData.gender || '',
                address: userData.address || '',
                emergencyContact: userData.emergencyContact || '',
                bloodTypeId: foundBloodTypeId, // Đã tìm được ID
                medicalConditions: userData.medicalConditions || '',
                lastDonationDate: userData.lastDonationDate ? userData.lastDonationDate.split('T')[0] : '',
                isReadyToDonate: userData.isReadyToDonate !== null ? userData.isReadyToDonate : true,
                roleName: userData.role || '', // Lưu tên role để hiển thị
                status: userData.status || 'Active',
                emailVerified: userData.emailVerified || false,
                phoneVerified: userData.phoneVerified || false,
            });

        } catch (error) {
            toast.error(`Lỗi khi tải dữ liệu người dùng: ${error.message}`);
            navigate('/admin/users');
        } finally {
            setIsLoading(false);
        }
    }, [userId, navigate]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Họ tên không được để trống.";
        if (!formData.roleName) newErrors.roleName = "Vai trò không được để trống.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Vui lòng kiểm tra lại các trường thông tin.");
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading("Đang cập nhật người dùng...");

        // --- FIX: Tìm roleId từ roleName trước khi gửi ---
        const selectedRole = roles.find(r => r.name === formData.roleName);

        const requestData = {
            ...formData,
            bloodTypeId: formData.bloodTypeId ? parseInt(formData.bloodTypeId, 10) : null,
            roleId: selectedRole ? selectedRole.id : null, // Gửi roleId lên backend
        };
        // Xóa roleName vì không có trong DTO của backend
        delete requestData.roleName;

        // Chuẩn hóa dữ liệu rỗng thành null
        Object.keys(requestData).forEach(key => {
            if (requestData[key] === '') {
                requestData[key] = null;
            }
        });

        try {
            await userService.updateUserByAdmin(userId, requestData);
            toast.success("Cập nhật người dùng thành công!", { id: toastId });
            navigate('/admin/users');
        } catch (error) {
            toast.error(`Lỗi khi cập nhật: ${error.message || 'Vui lòng thử lại.'}`, { id: toastId });
            if (error.response && error.response.data && typeof error.response.data === 'object') {
                setErrors(prev => ({ ...prev, ...error.response.data }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><LoadingSpinner size="12" /></div>;
    }
    if (!user) {
        return <div className="text-center py-10">Không tìm thấy người dùng.</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Link to="/admin/users" className="flex items-center text-red-600 hover:text-red-800 mb-4">
                <ArrowLeft size={20} className="mr-2" />
                Quay lại danh sách
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Chỉnh sửa Người dùng: <span className="text-red-600">{user.fullName}</span></h1>
            <p className="text-sm text-gray-500 mb-6">ID: {userId}</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Họ và tên đầy đủ" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required error={errors.fullName} disabled={isSubmitting} />
                    <InputField label="Số điện thoại" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.phone} disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Ngày sinh" id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} error={errors.dateOfBirth} disabled={isSubmitting} InputLabelProps={{ shrink: true }} />
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} disabled={isSubmitting}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="">-- Chọn giới tính --</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                            <option value="Other">Khác</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                    </div>
                </div>
                <InputField label="Địa chỉ" id="address" name="address" type="textarea" value={formData.address} onChange={handleInputChange} error={errors.address} disabled={isSubmitting} rows={3} />
                <InputField label="Liên hệ khẩn cấp" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} error={errors.emergencyContact} disabled={isSubmitting} />

                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 pt-4">Thông tin Y tế & Hiến máu</h2>
                <div>
                    <label htmlFor="bloodTypeId" className="block text-sm font-medium text-gray-700 mb-1">Nhóm máu</label>
                    <select
                        id="bloodTypeId" name="bloodTypeId" value={formData.bloodTypeId}
                        onChange={handleInputChange}
                        disabled={isSubmitting || bloodTypes.length === 0}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.bloodTypeId ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="">-- Chọn nhóm máu --</option>
                        {/* --- FIX: Sử dụng 'description' thay vì 'bloodGroup' --- */}
                        {bloodTypes.map(bt => (
                            <option key={bt.id} value={bt.id}>{bt.description}</option>
                        ))}
                    </select>
                    {errors.bloodTypeId && <p className="mt-1 text-xs text-red-600">{errors.bloodTypeId}</p>}
                </div>
                <InputField label="Tình trạng bệnh lý (nếu có)" id="medicalConditions" name="medicalConditions" type="textarea" value={formData.medicalConditions} onChange={handleInputChange} error={errors.medicalConditions} disabled={isSubmitting} rows={3} />
                <InputField label="Ngày hiến máu gần nhất" id="lastDonationDate" name="lastDonationDate" type="date" value={formData.lastDonationDate} onChange={handleInputChange} error={errors.lastDonationDate} disabled={isSubmitting} InputLabelProps={{ shrink: true }} />
                <div className="flex items-center">
                    <input id="isReadyToDonate" name="isReadyToDonate" type="checkbox" checked={formData.isReadyToDonate} onChange={handleInputChange} disabled={isSubmitting} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                    <label htmlFor="isReadyToDonate" className="ml-2 block text-sm text-gray-900">Sẵn sàng hiến máu</label>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 pt-4">Thông tin Tài khoản</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                        <select id="roleName" name="roleName" value={formData.roleName} onChange={handleInputChange} disabled={isSubmitting || roles.length === 0} required
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.roleName ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="">-- Chọn vai trò --</option>
                            {roles.map(role => <option key={role.name} value={role.name}>{role.name} ({role.description})</option>)}
                        </select>
                        {errors.roleName && <p className="mt-1 text-xs text-red-600">{errors.roleName}</p>}
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                        <select id="status" name="status" value={formData.status} onChange={handleInputChange} disabled={isSubmitting}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.status ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Pending">Pending</option>
                        </select>
                        {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
                    </div>
                </div>
                <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                        <input id="emailVerified" name="emailVerified" type="checkbox" checked={formData.emailVerified} onChange={handleInputChange} disabled={isSubmitting} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                        <label htmlFor="emailVerified" className="ml-2 block text-sm text-gray-900">Email đã xác thực</label>
                    </div>
                    <div className="flex items-center">
                        <input id="phoneVerified" name="phoneVerified" type="checkbox" checked={formData.phoneVerified} onChange={handleInputChange} disabled={isSubmitting} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                        <label htmlFor="phoneVerified" className="ml-2 block text-sm text-gray-900">SĐT đã xác thực</label>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Link to="/admin/users">
                        <Button type="button" variant="secondary" disabled={isSubmitting}>
                            Hủy
                        </Button>
                    </Link>
                    <Button type="submit" variant="primary" disabled={isSubmitting} isLoading={isSubmitting}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminUserEditPage;