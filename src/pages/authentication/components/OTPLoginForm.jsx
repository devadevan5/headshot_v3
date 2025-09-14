import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OTPLoginForm = ({ onOTPLogin, isLoading = false }) => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};
    
    if (!formData?.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData?.otp?.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    } else if (!/^\d+$/?.test(formData?.otp)) {
      newErrors.otp = 'OTP must contain only numbers';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    
    if (validateEmail()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStep('otp');
        setCountdown(60);
        setErrors({});
      } catch (error) {
        setErrors({ email: 'Failed to send OTP. Please try again.' });
      }
    }
  };

  const handleVerifyOTP = (e) => {
    e?.preventDefault();
    
    if (validateOTP()) {
      // Mock OTP validation - in real app, this would be validated server-side
      if (formData?.otp === '123456') {
        onOTPLogin(formData);
      } else {
        setErrors({ otp: 'Invalid OTP. Try: 123456' });
      }
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Failed to resend OTP. Please try again.' });
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setFormData(prev => ({ ...prev, otp: '' }));
    setErrors({});
    setCountdown(0);
  };

  if (step === 'email') {
    return (
      <form onSubmit={handleSendOTP} className="space-y-4">
        <div className="text-center mb-6">
          <Icon name="Mail" size={48} className="mx-auto text-primary mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Login with OTP
          </h3>
          <p className="text-sm text-text-secondary">
            We'll send a verification code to your email
          </p>
        </div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="Send"
          iconPosition="left"
        >
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <div className="text-center mb-6">
        <Icon name="Shield" size={48} className="mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Enter Verification Code
        </h3>
        <p className="text-sm text-text-secondary">
          We sent a 6-digit code to {formData?.email}
        </p>
      </div>
      {errors?.general && (
        <div className="p-3 rounded-lg bg-error/10 border border-error/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Verification Code"
        type="text"
        name="otp"
        placeholder="Enter 6-digit code"
        value={formData?.otp}
        onChange={handleInputChange}
        error={errors?.otp}
        maxLength={6}
        required
        disabled={isLoading}
        className="text-center text-lg font-mono tracking-widest"
      />
      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={handleBackToEmail}
          className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center space-x-1"
          disabled={isLoading}
        >
          <Icon name="ArrowLeft" size={14} />
          <span>Change email</span>
        </button>
        
        {countdown > 0 ? (
          <span className="text-text-secondary">
            Resend in {countdown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending}
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            {isResending ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="Check"
        iconPosition="left"
      >
        {isLoading ? 'Verifying...' : 'Verify & Login'}
      </Button>
    </form>
  );
};

export default OTPLoginForm;