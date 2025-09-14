import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

/**
 * A component that provides a form for users to register for a new account.
 *
 * @param {object} props - The properties for the component.
 * @param {function} props.onRegister - A function to be called when the user submits the form.
 * @param {boolean} [props.isLoading=false] - Whether the form is in a loading state.
 * @returns {JSX.Element} The rendered registration form.
 */
const RegisterForm = ({ onRegister, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Generates a random password.
   * @returns {string} A randomly generated password.
   */
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    return password;
  };

  /**
   * Handles the generation of a new password.
   */
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData(prev => ({
      ...prev,
      password: newPassword,
      confirmPassword: newPassword
    }));

    // Clear password errors
    setErrors(prev => ({
      ...prev,
      password: '',
      confirmPassword: ''
    }));
  };

  /**
   * Handles changes to the form inputs.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validates the form data.
   * @returns {boolean} Whether the form is valid.
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  /**
   * Handles the submission of the form.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = (e) => {
    e?.preventDefault();

    if (validateForm()) {
      onRegister(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleGeneratePassword}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
            disabled={isLoading}
          >
            Generate
          </Button>
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 p-1 rounded-lg hover:bg-muted transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon
              name={showPassword ? 'EyeOff' : 'Eye'}
              size={16}
              className="text-text-secondary"
            />
          </button>
        </div>
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 p-1 rounded-lg hover:bg-muted transition-colors duration-200"
          disabled={isLoading}
        >
          <Icon
            name={showConfirmPassword ? 'EyeOff' : 'Eye'}
            size={16}
            className="text-text-secondary"
          />
        </button>
      </div>
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        checked={formData?.acceptTerms}
        onChange={(e) => handleInputChange(e)}
        name="acceptTerms"
        error={errors?.acceptTerms}
        required
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
      <div className="text-center">
        <p className="text-xs text-text-secondary">
          By creating an account, you'll receive 2 free credits to get started!
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;