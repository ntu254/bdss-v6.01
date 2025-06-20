// components/forms/LoginForm.jsx - Login form component
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../ui/Toast';
import Input from './Input';
import Button from '../common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
    const { login, loading, error, clearError } = useAuth();
  const { toast } = useToast();
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
      try {
      await login(formData.email, formData.password);
      toast.success('Đăng nhập thành công', 'Chào mừng bạn quay trở lại!');
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      toast.error('Đăng nhập thất bại', err.message);
      console.error('Login failed:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-600">{error}</div>
        </div>
      )}
      
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
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Ghi nhớ đăng nhập
          </label>
        </div>
        
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
            Quên mật khẩu?
          </Link>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={loading}
        className="w-full"
      >
        Đăng nhập
      </Button>
      
      <div className="text-center">
        <span className="text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
            Đăng ký ngay
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
