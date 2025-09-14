import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

/**
 * A dropdown menu that displays user information and provides links to account settings, subscription management, and help.
 * It also includes a logout button.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.userName="John Doe"] - The name of the user.
 * @param {string} [props.userEmail="john@example.com"] - The email of the user.
 * @param {string} [props.userAvatar=null] - The URL of the user's avatar.
 * @param {function} props.onLogout - A function to be called when the user clicks the logout button.
 * @returns {JSX.Element} The rendered user profile dropdown component.
 */
const UserProfileDropdown = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = null,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Account Settings',
      path: '/account-settings',
      icon: 'Settings',
      description: 'Manage your profile and preferences'
    },
    {
      label: 'Subscription',
      path: '/subscription-management',
      icon: 'CreditCard',
      description: 'View and manage your subscription'
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      description: 'Get help and contact support'
    }
  ];

  useEffect(() => {
    /**
     * Handles clicks outside the dropdown to close it.
     * @param {MouseEvent} event - The mouse event.
     */
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    /**
     * Handles the escape key press to close the dropdown.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  /**
   * Navigates to a given path.
   * @param {string} path - The path to navigate to.
   */
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  /**
   * Handles the logout process.
   */
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      localStorage.removeItem('authToken');
      navigate('/authentication');
    }
    setIsOpen(false);
  };

  /**
   * Returns the initials of a name.
   * @param {string} name - The name to get the initials from.
   * @returns {string} The initials of the name.
   */
  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {getInitials(userName)}
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground truncate max-w-32">
            {userName}
          </p>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-lg z-50 animate-slide-down">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-medium">
                  {getInitials(userName)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {userName}
                </p>
                <p className="text-sm text-text-secondary truncate">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="flex items-start space-x-3 w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 focus:outline-none focus:bg-muted"
              >
                <Icon name={item?.icon} size={18} className="mt-0.5 text-text-secondary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item?.label}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {item?.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-border p-2">
            <Button
              variant="ghost"
              fullWidth
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              className="justify-start text-error hover:text-error hover:bg-error/10"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfileDropdown;