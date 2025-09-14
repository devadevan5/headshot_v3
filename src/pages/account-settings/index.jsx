import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import PWASection from './components/PWASection';
import CreditHistorySection from './components/CreditHistorySection';
import DataManagementSection from './components/DataManagementSection';
import Icon from '../../components/AppIcon';

/**
 * The main page for account settings.
 * It displays a sidebar with different sections and renders the active section in the main content area.
 *
 * @returns {JSX.Element} The rendered account settings page.
 */
const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userCredits] = useState(150);
  const [userEmail] = useState('john.doe@example.com');
  const [userName] = useState('John Doe');

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: 'User',
      description: 'Personal information and account details'
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'Shield',
      description: 'Password, 2FA, and active sessions'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      description: 'Email preferences and communication settings'
    },
    {
      id: 'pwa',
      title: 'App Installation',
      icon: 'Smartphone',
      description: 'Install as native app'
    },
    {
      id: 'credits',
      title: 'Credit History',
      icon: 'Coins',
      description: 'Usage history and transactions'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: 'Database',
      description: 'Download data and clear history'
    }
  ];

  /**
   * Handles the update of the user's profile.
   * @param {object} profileData - The updated profile data.
   */
  const handleProfileUpdate = (profileData) => {
    console.log('Profile updated:', profileData);
    // Handle profile update logic
  };

  /**
   * Handles the update of the user's security settings.
   * @param {object} securityData - The updated security data.
   */
  const handleSecurityUpdate = (securityData) => {
    console.log('Security settings updated:', securityData);
    // Handle security update logic
  };

  /**
   * Handles the update of the user's notification settings.
   * @param {object} notificationData - The updated notification data.
   */
  const handleNotificationUpdate = (notificationData) => {
    console.log('Notification settings updated:', notificationData);
    // Handle notification update logic
  };

  /**
   * Handles the installation of the PWA.
   */
  const handlePWAInstall = () => {
    console.log('PWA installation completed');
    // Handle PWA installation logic
  };

  /**
   * Handles data management actions.
   * @param {string} action - The action to perform.
   * @param {object} data - The data associated with the action.
   */
  const handleDataAction = (action, data) => {
    console.log('Data action:', action, data);
    // Handle data management actions
  };

  /**
   * Renders the active settings section.
   * @returns {JSX.Element | null} The rendered settings section.
   */
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileSection
            userEmail={userEmail}
            onUpdateProfile={handleProfileUpdate}
          />
        );
      case 'security':
        return (
          <SecuritySection
            onSecurityUpdate={handleSecurityUpdate}
          />
        );
      case 'notifications':
        return (
          <NotificationSection
            onNotificationUpdate={handleNotificationUpdate}
          />
        );
      case 'pwa':
        return (
          <PWASection
            onInstallPWA={handlePWAInstall}
          />
        );
      case 'credits':
        return (
          <CreditHistorySection
            currentCredits={userCredits}
          />
        );
      case 'data':
        return (
          <DataManagementSection
            onDataAction={handleDataAction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        userCredits={userCredits}
        userName={userName}
        userEmail={userEmail}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-text-secondary">
            Manage your profile, security, and application preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation - Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
              <nav className="space-y-2">
                {settingsSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeSection === section?.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-text-secondary hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={section?.icon} size={20} />
                    <div>
                      <p className="font-medium">{section?.title}</p>
                      <p className={`text-xs ${
                        activeSection === section?.id
                          ? 'text-primary-foreground/80'
                          : 'text-text-secondary'
                      }`}>
                        {section?.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Navigation - Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="bg-card rounded-lg border border-border p-2">
              <div className="flex overflow-x-auto space-x-1 scrollbar-hide">
                {settingsSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                      ${activeSection === section?.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-text-secondary hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 min-w-0">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;