import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSection = ({ onNotificationUpdate }) => {
  const [notifications, setNotifications] = useState({
    generationComplete: true,
    subscriptionUpdates: true,
    promotionalEmails: false,
    securityAlerts: true,
    weeklyDigest: true,
    newFeatures: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const notificationSettings = [
    {
      key: 'generationComplete',
      title: 'Generation Complete',
      description: 'Get notified when your headshot generation is finished',
      icon: 'Camera',
      category: 'Essential'
    },
    {
      key: 'subscriptionUpdates',
      title: 'Subscription Updates',
      description: 'Billing notifications, plan changes, and renewal reminders',
      icon: 'CreditCard',
      category: 'Essential'
    },
    {
      key: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Login attempts, password changes, and security notifications',
      icon: 'Shield',
      category: 'Essential'
    },
    {
      key: 'weeklyDigest',
      title: 'Weekly Digest',
      description: 'Summary of your activity and account insights',
      icon: 'BarChart3',
      category: 'Updates'
    },
    {
      key: 'newFeatures',
      title: 'New Features',
      description: 'Updates about new features and product improvements',
      icon: 'Sparkles',
      category: 'Updates'
    },
    {
      key: 'promotionalEmails',
      title: 'Promotional Emails',
      description: 'Special offers, discounts, and marketing communications',
      icon: 'Tag',
      category: 'Marketing'
    }
  ];

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onNotificationUpdate) {
        onNotificationUpdate(notifications);
      }
      
      console.log('Notification settings saved:', notifications);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedSettings = notificationSettings?.reduce((acc, setting) => {
    if (!acc?.[setting?.category]) {
      acc[setting.category] = [];
    }
    acc?.[setting?.category]?.push(setting);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Essential':
        return 'Bell';
      case 'Updates':
        return 'Info';
      case 'Marketing':
        return 'Megaphone';
      default:
        return 'Settings';
    }
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case 'Essential':
        return 'Important notifications for account security and service updates';
      case 'Updates':
        return 'Optional notifications to keep you informed about your account';
      case 'Marketing':
        return 'Promotional content and special offers';
      default:
        return '';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
          <p className="text-sm text-text-secondary mt-1">
            Choose what notifications you'd like to receive via email
          </p>
        </div>
        <Button
          variant="default"
          onClick={handleSaveSettings}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save Settings
        </Button>
      </div>
      <div className="space-y-8">
        {Object.entries(groupedSettings)?.map(([category, settings]) => (
          <div key={category}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getCategoryIcon(category)} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">{category}</h3>
                <p className="text-sm text-text-secondary">
                  {getCategoryDescription(category)}
                </p>
              </div>
            </div>

            <div className="space-y-3 ml-11">
              {settings?.map((setting) => (
                <div
                  key={setting?.key}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                      <Icon name={setting?.icon} size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{setting?.title}</p>
                      <p className="text-sm text-text-secondary">{setting?.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleToggle(setting?.key)}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                      ${notifications?.[setting?.key] ? 'bg-primary' : 'bg-muted'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-background transition-transform duration-200
                        ${notifications?.[setting?.key] ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Email Frequency */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={16} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Email Frequency</h3>
              <p className="text-sm text-text-secondary">
                Control how often you receive non-essential notifications
              </p>
            </div>
          </div>

          <div className="ml-11 space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Digest Frequency</p>
                <p className="text-sm text-text-secondary">
                  How often you receive summary emails
                </p>
              </div>
              <select className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="daily">Daily</option>
                <option value="weekly" selected>Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Quiet Hours</p>
                <p className="text-sm text-text-secondary">
                  Pause non-urgent notifications during these hours
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  defaultValue="22:00"
                  className="px-2 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <span className="text-text-secondary">to</span>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="px-2 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Unsubscribe All */}
        <div className="border-t border-border pt-8">
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-warning">Unsubscribe from All</h4>
                <p className="text-sm text-warning/80 mt-1">
                  You can unsubscribe from all non-essential emails, but you'll still receive important security and billing notifications.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-warning text-warning hover:bg-warning/10"
                >
                  Unsubscribe from All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;