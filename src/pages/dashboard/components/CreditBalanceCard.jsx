import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * A card component that displays the user's credit balance and subscription tier.
 *
 * @param {object} props - The properties for the component.
 * @param {number} [props.credits=0] - The number of credits the user has.
 * @param {string} [props.subscriptionTier='Free'] - The user's subscription tier.
 * @param {function} props.onUpgrade - A function to be called when the user clicks the "Add Credits" button.
 * @param {boolean} [props.showUpgradeButton=true] - Whether to show the "Add Credits" button.
 * @returns {JSX.Element} The rendered credit balance card.
 */
const CreditBalanceCard = ({
  credits = 0,
  subscriptionTier = 'Free',
  onUpgrade,
  showUpgradeButton = true
}) => {
  /**
   * Returns the credit status based on the number of credits.
   * @returns {'empty' | 'low' | 'medium' | 'high'} The credit status.
   */
  const getCreditStatus = () => {
    if (credits === 0) return 'empty';
    if (credits <= 5) return 'low';
    if (credits <= 15) return 'medium';
    return 'high';
  };

  /**
   * Returns the color class for the credit status.
   * @returns {string} The color class.
   */
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

  /**
   * Returns the icon name for the credit status.
   * @returns {string} The icon name.
   */
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

  /**
   * Returns a message for the credit status.
   * @returns {string} The status message.
   */
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