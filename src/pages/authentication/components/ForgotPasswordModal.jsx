import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

/**
 * A modal component that allows users to request a password reset link.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - A function to close the modal.
 * @param {function} props.onResetRequest - A function to be called when a password reset is requested.
 * @returns {JSX.Element | null} The rendered forgot password modal or null if it is not open.
 */
const ForgotPasswordModal = ({ isOpen, onClose, onResetRequest }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    /**
     * Handles the escape key press to close the modal.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  /**
   * Closes the modal and resets its state.
   */
  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    setIsLoading(false);
    onClose();
  };

  /**
   * Handles the submission of the password reset request.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (onResetRequest) {
        onResetRequest(email);
      }

      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles changes to the email input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e) => {
    setEmail(e?.target?.value);
    if (error) {
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-background rounded-xl shadow-lg animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <Icon name="Lock" size={48} className="mx-auto text-primary mb-3" />
                <p className="text-text-secondary">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange}
                  error={error}
                  required
                  disabled={isLoading}
                />

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    loading={isLoading}
                    iconName="Send"
                    iconPosition="left"
                    className="flex-1"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Reset Link Sent!
              </h3>
              <p className="text-text-secondary mb-6">
                We've sent a password reset link to <strong>{email}</strong>.
                Check your inbox and follow the instructions to reset your password.
              </p>
              <Button
                variant="default"
                onClick={handleClose}
                fullWidth
                iconName="Mail"
                iconPosition="left"
              >
                Check Email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;