import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import OTPLoginForm from './components/OTPLoginForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';

/**
 * A component that handles user authentication, including login, registration, and social authentication.
 * It also includes a forgot password modal.
 *
 * @returns {JSX.Element} The rendered authentication page.
 */
const Authentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [authMethod, setAuthMethod] = useState('standard'); // 'standard' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  /**
   * Handles the login process.
   * @param {object} credentials - The user's login credentials.
   */
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful login
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userEmail', credentials?.email);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the registration process.
   * @param {object} userData - The user's registration data.
   */
  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration with 2 free credits
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userEmail', userData?.email);
      localStorage.setItem('userCredits', '2');

      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles social authentication.
   * @param {string} provider - The social authentication provider.
   */
  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockEmail = provider === 'google' ? 'user@gmail.com' : 'user@icloud.com';
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userEmail', mockEmail);
      localStorage.setItem('userCredits', '2');

      navigate('/dashboard');
    } catch (error) {
      console.error('Social auth failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP login.
   * @param {object} otpData - The OTP data.
   */
  const handleOTPLogin = async (otpData) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userEmail', otpData?.email);

      navigate('/dashboard');
    } catch (error) {
      console.error('OTP login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the forgot password process.
   * @param {string} email - The user's email address.
   */
  const handleForgotPassword = (email) => {
    console.log('Password reset requested for:', email);
    // In real app, this would trigger password reset email
  };

  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'LogIn' },
    { id: 'register', label: 'Create Account', icon: 'UserPlus' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Camera" size={28} color="white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">Headshot.com</h1>
                <p className="text-text-secondary">Professional AI Headshots</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Create Professional Headshots in Minutes
              </h2>
              <p className="text-lg text-text-secondary">
                Transform your selfies into professional headshots using advanced AI technology.
                Perfect for LinkedIn, resumes, and business profiles.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                alt="Professional headshot example 1"
                className="rounded-lg object-cover w-full h-32"
              />
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                alt="Professional headshot example 2"
                className="rounded-lg object-cover w-full h-32"
              />
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>2 Free Credits</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-background rounded-2xl shadow-lg border border-border p-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Camera" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Headshot.com</h1>
                </div>
              </div>
              <p className="text-text-secondary">Create professional headshots with AI</p>
            </div>

            {/* Auth Method Toggle */}
            {activeTab === 'login' && (
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                  onClick={() => setAuthMethod('standard')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    authMethod === 'standard' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  Password
                </button>
                <button
                  onClick={() => setAuthMethod('otp')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    authMethod === 'otp' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  OTP
                </button>
              </div>
            )}

            {/* Tab Navigation */}
            {authMethod === 'standard' && (
              <div className="flex bg-muted rounded-lg p-1 mb-6">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-text-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Form Content */}
            <div className="space-y-6">
              {authMethod === 'otp' ? (
                <OTPLoginForm
                  onOTPLogin={handleOTPLogin}
                  isLoading={isLoading}
                />
              ) : activeTab === 'login' ? (
                <LoginForm
                  onLogin={handleLogin}
                  isLoading={isLoading}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              ) : (
                <RegisterForm
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              )}

              {/* Social Auth - Only show for standard auth methods */}
              {authMethod === 'standard' && (
                <SocialAuthButtons
                  onGoogleAuth={() => handleSocialAuth('google')}
                  onAppleAuth={() => handleSocialAuth('apple')}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-text-secondary">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onResetRequest={handleForgotPassword}
      />
    </div>
  );
};

export default Authentication;