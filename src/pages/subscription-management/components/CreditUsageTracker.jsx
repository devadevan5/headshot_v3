import React from 'react';
import Icon from '../../../components/AppIcon';

/**
 * A component that displays the user's credit usage, including their current balance,
 * total credits, and recent usage history.
 *
 * @param {object} props - The properties for the component.
 * @param {number} props.currentCredits - The user's current credit balance.
 * @param {number} props.totalCredits - The user's total credits for the current billing period.
 * @param {Array<object>} props.monthlyUsage - An array of objects representing the user's monthly usage.
 * @param {string} props.resetDate - The date when the user's credits will reset.
 * @returns {JSX.Element} The rendered credit usage tracker.
 */
const CreditUsageTracker = ({
  currentCredits,
  totalCredits,
  monthlyUsage,
  resetDate
}) => {
  const usagePercentage = ((totalCredits - currentCredits) / totalCredits) * 100;
  const remainingPercentage = (currentCredits / totalCredits) * 100;

  /**
   * Formats a date string into a human-readable format.
   * @param {string} dateString - The date string to format.
   * @returns {string} The formatted date.
   */
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Returns the color class for the usage progress bar.
   * @returns {string} The color class.
   */
  const getUsageColor = () => {
    if (remainingPercentage <= 10) return 'bg-error';
    if (remainingPercentage <= 25) return 'bg-warning';
    return 'bg-success';
  };

  /**
   * Returns the color class for the usage text.
   * @returns {string} The color class.
   */
  const getUsageTextColor = () => {
    if (remainingPercentage <= 10) return 'text-error';
    if (remainingPercentage <= 25) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Credit Usage
        </h3>
        <div className="text-sm text-text-secondary">
          Resets on {formatDate(resetDate)}
        </div>
      </div>
      {/* Current Balance */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Current Balance</span>
          <span className={`font-semibold ${getUsageTextColor()}`}>
            {currentCredits} of {totalCredits} credits
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getUsageColor()}`}
            style={{ width: `${remainingPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>0</span>
          <span>{totalCredits}</span>
        </div>
      </div>
      {/* Usage Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {totalCredits - currentCredits}
          </div>
          <div className="text-sm text-text-secondary">
            Credits Used
          </div>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {Math.round(usagePercentage)}%
          </div>
          <div className="text-sm text-text-secondary">
            Monthly Usage
          </div>
        </div>
      </div>
      {/* Usage History */}
      {monthlyUsage && monthlyUsage?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Recent Usage
          </h4>
          <div className="space-y-2">
            {monthlyUsage?.slice(0, 3)?.map((usage, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Camera" size={14} className="text-text-secondary" />
                  <span className="text-foreground">{usage?.description}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary">
                    {formatDate(usage?.date)}
                  </span>
                  <span className="font-medium text-foreground">
                    -{usage?.credits} credits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Low Credit Warning */}
      {remainingPercentage <= 25 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">
              {remainingPercentage <= 10
                ? 'Critical: Very low credit balance' :'Warning: Low credit balance'
              }
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Consider upgrading your plan to avoid interruptions.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreditUsageTracker;