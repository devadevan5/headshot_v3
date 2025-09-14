import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSummaryCard = ({ 
  subscriptionTier = 'Free',
  nextBillingDate = null,
  isActive = true,
  totalHeadshots = 0,
  joinDate = new Date('2025-01-01')
}) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })?.format(date);
  };

  const getSubscriptionStatus = () => {
    if (subscriptionTier === 'Free') return 'free';
    if (!isActive) return 'inactive';
    return 'active';
  };

  const getStatusColor = () => {
    const status = getSubscriptionStatus();
    switch (status) {
      case 'free':
        return 'text-text-secondary';
      case 'inactive':
        return 'text-error';
      default:
        return 'text-success';
    }
  };

  const getStatusIcon = () => {
    const status = getSubscriptionStatus();
    switch (status) {
      case 'free':
        return 'User';
      case 'inactive':
        return 'AlertCircle';
      default:
        return 'CheckCircle';
    }
  };

  const getStatusText = () => {
    const status = getSubscriptionStatus();
    switch (status) {
      case 'free':
        return 'Free Account';
      case 'inactive':
        return 'Subscription Inactive';
      default:
        return 'Active Subscription';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Account Summary</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/account-settings')}
          iconName="Settings"
          iconPosition="left"
        >
          Settings
        </Button>
      </div>

      <div className="space-y-6">
        {/* Subscription Status */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-background ${getStatusColor()}`}>
              <Icon name={getStatusIcon()} size={20} />
            </div>
            <div>
              <p className="font-medium text-foreground">{subscriptionTier} Plan</p>
              <p className={`text-sm ${getStatusColor()}`}>{getStatusText()}</p>
            </div>
          </div>
          {subscriptionTier !== 'Free' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/subscription-management')}
              iconName="ExternalLink"
            >
              Manage
            </Button>
          )}
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">
              {totalHeadshots}
            </div>
            <div className="text-sm text-text-secondary">
              Total Headshots
            </div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">
              {Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-sm text-text-secondary">
              Days Active
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Member Since</span>
            <span className="text-sm font-medium text-foreground">
              {formatDate(joinDate)}
            </span>
          </div>
          
          {nextBillingDate && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Next Billing</span>
              <span className="text-sm font-medium text-foreground">
                {formatDate(nextBillingDate)}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Account Status</span>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 gap-3">
            {subscriptionTier === 'Free' && (
              <Button
                variant="default"
                onClick={() => navigate('/subscription-management')}
                iconName="Crown"
                iconPosition="left"
                fullWidth
              >
                Upgrade to Pro
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => navigate('/account-settings')}
              iconName="User"
              iconPosition="left"
              fullWidth
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryCard;