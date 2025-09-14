import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CurrentPlanCard = ({ 
  currentPlan, 
  nextBillingDate, 
  isActive, 
  onManageBilling,
  onCancelSubscription 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (!isActive) return 'text-error';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (!isActive) return 'AlertCircle';
    return 'CheckCircle';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Current Plan
          </h2>
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon()} 
              size={16} 
              className={getStatusColor()}
            />
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {isActive ? 'Active' : 'Cancelled'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground">
            ${currentPlan?.price}
          </div>
          <div className="text-sm text-text-secondary">per month</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {currentPlan?.name} Plan
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Coins" size={16} className="text-accent" />
              <span className="text-sm text-foreground">
                {currentPlan?.credits} credits per month
              </span>
            </div>
            {currentPlan?.features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Billing Information
          </h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-text-secondary">Next billing date</div>
              <div className="font-medium text-foreground">
                {formatDate(nextBillingDate)}
              </div>
            </div>
            <div>
              <div className="text-sm text-text-secondary">Renewal status</div>
              <div className="font-medium text-foreground">
                {isActive ? 'Auto-renewal enabled' : 'Cancelled - Access until billing period ends'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={onManageBilling}
          iconName="CreditCard"
          iconPosition="left"
          className="flex-1"
        >
          Manage Billing
        </Button>
        {isActive && (
          <Button
            variant="outline"
            onClick={onCancelSubscription}
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            Cancel Subscription
          </Button>
        )}
      </div>
    </div>
  );
};

export default CurrentPlanCard;