import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import CreditBalanceIndicator from './CreditBalanceIndicator';
import UserProfileDropdown from './UserProfileDropdown';

/**
 * The main header of the application.
 * It displays the logo, navigation links, user information, and a credit balance indicator.
 * It has different states for authenticated and unauthenticated users.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} [props.isAuthenticated=true] - Whether the user is authenticated.
 * @param {number} [props.userCredits=150] - The number of credits the user has.
 * @param {string} [props.userName="John Doe"] - The name of the user.
 * @param {string} [props.userEmail="john@example.com"] - The email of the user.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = ({ isAuthenticated = true, userCredits = 150, userName = "John Doe", userEmail = "john@example.com" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Create',
      path: '/headshot-generation',
      icon: 'Camera',
      tooltip: 'Generate professional headshots'
    },
    {
      label: 'Gallery',
      path: '/dashboard',
      icon: 'Images',
      tooltip: 'View your headshots'
    },
    {
      label: 'Subscription',
      path: '/subscription-management',
      icon: 'CreditCard',
      tooltip: 'Manage your plan'
    },
    {
      label: 'Account',
      path: '/account-settings',
      icon: 'Settings',
      tooltip: 'Account settings'
    }
  ];

  /**
   * Checks if a given path is the active path.
   * @param {string} path - The path to check.
   * @returns {boolean} Whether the path is active.
   */
  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  /**
   * Navigates to a given path.
   * @param {string} path - The path to navigate to.
   */
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  /**
   * Navigates to the dashboard when the logo is clicked.
   */
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  /**
   * Navigates to the subscription management page.
   */
  const handleUpgrade = () => {
    navigate('/subscription-management');
  };

  /**
   * Handles the logout process.
   */
  const handleLogout = () => {
    // Add logout logic here or navigate to authentication
    navigate('/authentication');
  };

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Camera" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">Headshot.com</span>
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => navigate('/authentication')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
            onClick={handleLogoClick}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Camera" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">Headshot.com</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <CreditBalanceIndicator credits={userCredits} onUpgrade={handleUpgrade} />
            <UserProfileDropdown
              userName={userName}
              userEmail={userEmail}
              onLogout={handleLogout}
            />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="py-4 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center space-x-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;