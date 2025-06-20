// components/forms/RegisterForm.jsx - Registration form component
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useBloodTypes } from '../../hooks/useBlood';
import Input from './Input';
import Select from './Select';
import Button from '../common/Button';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    bloodTypeId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register, loading, error, clearError } = useAuth();
  const { data: bloodTypes } = useBloodTypes();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ là bắt buộc';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'Bạn phải từ 18 tuổi trở lên để hiến máu';
      }
    }
    
    if (!formData.bloodTypeId) {
      newErrors.bloodTypeId = 'Nhóm máu là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const { confirmPassword, ...registrationData } = formData;
      const result = await register({
        ...registrationData,
        bloodTypeId: parseInt(registrationData.bloodTypeId)
      });
        // Redirect to verification page or show success message
      navigate('/verify-email', { 
        state: { 
          email: formData.email,
          message: 'Vui lòng kiểm tra email để xác thực tài khoản' 
        }
      });
    } catch (err) {
      console.error('Registration failed:', err.message);
    }
  };
  const bloodTypeOptions = bloodTypes?.map(type => ({
    value: type.id,
    label: `${type.bloodGroup} - ${type.componentType || 'Unknown'}`
  })) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-600">{error}</div>
        </div>
      )}
      
      <Input
        label="Họ và tên"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        required
        placeholder="Nhập họ và tên đầy đủ"
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder="Nhập email của bạn"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            placeholder="Nhập mật khẩu"
          />
          <button
            type="button"
            className="absolute top-8 right-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="relative">
          <Input
            label="Xác nhận mật khẩu"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            placeholder="Nhập lại mật khẩu"
          />
          <button
            type="button"
            className="absolute top-8 right-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          placeholder="Nhập số điện thoại"
        />
        
        <Input
          label="Ngày sinh"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
          required
        />
      </div>
      
      <Input
        label="Địa chỉ"
        name="address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
        required
        placeholder="Nhập địa chỉ chi tiết"
      />
      
      <Select
        label="Nhóm máu"
        name="bloodTypeId"
        value={formData.bloodTypeId}
        onChange={handleChange}
        error={errors.bloodTypeId}
        required
        placeholder="Chọn nhóm máu của bạn"
        options={bloodTypeOptions}
      />
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          Tôi đồng ý với{' '}
          <Link to="/terms" className="text-red-600 hover:text-red-500">
            điều khoản dịch vụ
          </Link>
          {' '}và{' '}
          <Link to="/privacy" className="text-red-600 hover:text-red-500">
            chính sách bảo mật
          </Link>
        </label>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={loading}
        className="w-full"
      >
        Đăng ký
      </Button>
      
      <div className="text-center">
        <span className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Đăng nhập ngay
          </Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
