import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

/**
 * A component that allows users to view and edit their profile information,
 * including their email address and password. It also displays a list of connected accounts.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.userEmail="john.doe@example.com"] - The user's email address.
 * @param {function} props.onUpdateProfile - A function to be called when the user's profile is updated.
 * @returns {JSX.Element} The rendered profile section.
 */
const ProfileSection = ({ userEmail = "john.doe@example.com", onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: userEmail,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const connectedAccounts = [
    {
      provider: 'Google',
      email: userEmail,
      connected: true,
      icon: 'Mail'
    },
    {
      provider: 'Apple',
      email: null,
      connected: false,
      icon: 'Smartphone'
    }
  ];

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

    if (formData?.newPassword) {
      if (formData?.newPassword?.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (formData?.newPassword !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.currentPassword) {
        newErrors.currentPassword = 'Current password is required to set new password';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  /**
   * Calculates the strength of a password.
   * @param {string} password - The password to check.
   * @returns {{strength: number, label: string, color: string}} The password strength.
   */
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;

    const levels = [
      { label: 'Very Weak', color: 'bg-error' },
      { label: 'Weak', color: 'bg-warning' },
      { label: 'Fair', color: 'bg-accent' },
      { label: 'Good', color: 'bg-success' },
      { label: 'Strong', color: 'bg-success' }
    ];

    return {
      strength,
      label: levels?.[strength - 1]?.label || 'Very Weak',
      color: levels?.[strength - 1]?.color || 'bg-error'
    };
  };

  /**
   * Handles changes to the form inputs.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handles the submission of the form.
   */
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onUpdateProfile) {
        onUpdateProfile(formData);
      }

      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cancels the editing of the form.
   */
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      email: userEmail,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  /**
   * Handles the disconnection of a connected account.
   * @param {string} provider - The provider of the account to disconnect.
   */
  const handleDisconnectAccount = (provider) => {
    console.log(`Disconnecting ${provider} account`);
  };

  const passwordStrength = getPasswordStrength(formData?.newPassword);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
          <p className="text-sm text-text-secondary mt-1">
            Manage your account details and security settings
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Email Section */}
        <div>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={errors?.email}
            description={!isEditing ? "Your primary email address for account access" : ""}
          />
        </div>

        {/* Password Section */}
        {isEditing && (
          <div className="space-y-4">
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Change Password</h3>

              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={formData?.currentPassword}
                  onChange={handleInputChange}
                  error={errors?.currentPassword}
                  placeholder="Enter your current password"
                />

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={formData?.newPassword}
                  onChange={handleInputChange}
                  error={errors?.newPassword}
                  placeholder="Enter new password"
                  description="Password must be at least 8 characters long"
                />

                {formData?.newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Password Strength:</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength?.strength >= 3 ? 'text-success' :
                        passwordStrength?.strength >= 2 ? 'text-accent' : 'text-warning'
                      }`}>
                        {passwordStrength?.label}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                        style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          </div>
        )}

        {/* Connected Accounts */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {connectedAccounts?.map((account) => (
              <div
                key={account?.provider}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon name={account?.icon} size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{account?.provider}</p>
                    <p className="text-sm text-text-secondary">
                      {account?.connected ? account?.email : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {account?.connected ? (
                    <>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-sm text-success">Connected</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnectAccount(account?.provider)}
                        disabled={isEditing}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isEditing}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;