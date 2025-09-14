import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreditBalanceCard = ({ 
  credits = 0, 
  subscriptionTier = 'Free', 
  onUpgrade,
  showUpgradeButton = true 
}) => {
  const getCreditStatus = () => {
    if (credits === 0) return 'empty';
    if (credits <= 5) return 'low';
    if (credits <= 15) return 'medium';
    return 'high';
  };

  const getStatusColor = () => {
    const status = getCreditStatus();
    switch (status) {
      case 'empty':
        return 'text-error';
      case 'low':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      default:
        return 'text-success';
    }
  };

  const getStatusIcon = () => {
    const status = getCreditStatus();
    switch (status) {
      case 'empty':
        return 'AlertCircle';
      case 'low':
        return 'AlertTriangle';
      default:
        return 'Coins';
    }
  };

  const getStatusMessage = () => {
    const status = getCreditStatus();
    switch (status) {
      case 'empty':
        return 'No credits remaining';
      case 'low':
        return 'Running low on credits';
      case 'medium':
        return 'Good credit balance';
      default:
        return 'Excellent credit balance';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-muted ${getStatusColor()}`}>
            <Icon name={getStatusIcon()} size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Credit Balance</h2>
            <p className="text-sm text-text-secondary">{subscriptionTier} Plan</p>
          </div>
        </div>
        {showUpgradeButton && (getCreditStatus() === 'empty' || getCreditStatus() === 'low') && (
          <Button
            variant="default"
            size="sm"
            onClick={onUpgrade}
            iconName="Plus"
            iconPosition="left"
          >
            Add Credits
          </Button>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className={`text-3xl font-bold font-mono ${getStatusColor()}`}>
            {credits?.toLocaleString()}
          </span>
          <span className="text-text-secondary">credits</span>
        </div>
        
        <p className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusMessage()}
        </p>

        {credits > 0 && (
          <div className="text-xs text-text-secondary">
            Each headshot generation uses 1 credit
          </div>
        )}
      </div>
      {/* Credit Usage Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>Usage this month</span>
          <span>75% used</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CreditBalanceCard;