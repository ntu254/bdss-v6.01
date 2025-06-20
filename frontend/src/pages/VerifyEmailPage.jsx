// pages/VerifyEmailPage.jsx - Email verification page
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input, Container, SEO } from '../components';

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  
  const { verifyOTP, loading, error, clearError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email || '';
  const message = location.state?.message || '';

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only numbers, max 6 digits
    setOtp(value);
    
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
    
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!otp) {
      newErrors.otp = 'Mã OTP là bắt buộc';
    } else if (otp.length !== 6) {
      newErrors.otp = 'Mã OTP phải có 6 chữ số';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await verifyOTP({
        email,
        otp
      });
      
      // Redirect to profile or dashboard after successful verification
      navigate('/profile', {
        state: { message: 'Tài khoản đã được xác thực thành công!' }
      });
    } catch (err) {
      console.error('OTP verification failed:', err.message);
    }
  };

  const handleResendOTP = async () => {
    // TODO: Implement resend OTP functionality
    // This would call a resend OTP API endpoint
    console.log('Resend OTP for email:', email);
  };

  const handleGoBack = () => {
    navigate('/register');
  };

  if (!email) {
    navigate('/register');
    return null;
  }

  return (
    <Container>
      <SEO 
        title="Xác thực Email - BloodDonation"
        description="Xác thực email để hoàn tất đăng ký tài khoản hiến máu"
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-secondary-900">
              Xác thực Email
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              {message || `Chúng tôi đã gửi mã xác thực đến email`}
            </p>
            <p className="mt-1 text-sm font-medium text-primary-600">
              {email}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            <div>
              <Input
                label="Mã xác thực (OTP)"
                type="text"
                name="otp"
                value={otp}
                onChange={handleChange}
                error={errors.otp}
                required
                placeholder="Nhập 6 chữ số"
                className="text-center text-2xl tracking-widest font-mono"
                maxLength={6}
                autoComplete="off"
              />
              <p className="mt-2 text-xs text-secondary-500">
                Nhập mã 6 chữ số được gửi đến email của bạn
              </p>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Xác thực
              </Button>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="flex items-center text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại đăng ký
                </button>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Gửi lại mã
                </button>
              </div>
            </div>
          </form>

          {/* Help text */}
          <div className="text-center">
            <p className="text-xs text-secondary-500">
              Không nhận được email? Kiểm tra thư mục spam hoặc 
              <button 
                onClick={handleResendOTP}
                className="text-primary-600 hover:text-primary-700 ml-1"
              >
                gửi lại mã
              </button>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
