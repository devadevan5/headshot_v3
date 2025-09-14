import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlanComparisonCard = ({ 
  plan, 
  isCurrentPlan, 
  onSelectPlan, 
  isProcessing 
}) => {
  const isUpgrade = plan?.price > 0; // Assuming current plan comparison logic

  return (
    <div className={`
      relative bg-card border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md
      ${isCurrentPlan 
        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
      }
      ${plan?.popular ? 'ring-2 ring-accent ring-opacity-20' : ''}
    `}>
      {plan?.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </span>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Current Plan
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {plan?.name}
        </h3>
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-3xl font-bold text-foreground">
            ${plan?.price}
          </span>
          <span className="text-text-secondary ml-1">/month</span>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Icon name="Coins" size={16} className="text-accent" />
          <span className="text-accent font-medium">
            {plan?.credits} credits included
          </span>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {!isCurrentPlan && (
          <Button
            variant={isUpgrade ? "default" : "outline"}
            fullWidth
            onClick={() => onSelectPlan(plan)}
            loading={isProcessing}
            iconName={isUpgrade ? "ArrowUp" : "ArrowDown"}
            iconPosition="left"
          >
            {isUpgrade ? 'Upgrade' : 'Downgrade'} to {plan?.name}
          </Button>
        )}
        
        {isCurrentPlan && (
          <div className="text-center py-2">
            <span className="text-sm text-text-secondary">
              Your current plan
            </span>
          </div>
        )}
      </div>
      {plan?.savings && (
        <div className="mt-3 text-center">
          <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded-full">
            Save ${plan?.savings}/month
          </span>
        </div>
      )}
    </div>
  );
};

export default PlanComparisonCard;