import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CreditBalanceIndicator = ({ credits = 0, onUpgrade }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCreditStatus = () => {
    if (credits === 0) return 'empty';
    if (credits <= 10) return 'low';
    if (credits <= 50) return 'medium';
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

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      // Default behavior - could trigger a modal or navigate to subscription page
      console.log('Upgrade credits clicked');
    }
  };

  return (
    <div className="relative">
      {/* Desktop View */}
      <div className="hidden md:flex items-center space-x-2">
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={16} />
          <span className="font-mono text-sm font-medium">
            {credits?.toLocaleString()}
          </span>
          <span className="text-xs text-text-secondary">credits</span>
        </div>
        
        {(getCreditStatus() === 'empty' || getCreditStatus() === 'low') && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpgrade}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            Add Credits
          </Button>
        )}
      </div>
      {/* Mobile View */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted transition-all duration-200 ${getStatusColor()}`}
        >
          <Icon name={getStatusIcon()} size={16} />
          <span className="font-mono text-sm font-medium">
            {credits?.toLocaleString()}
          </span>
        </button>

        {/* Mobile Expanded View */}
        {isExpanded && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 animate-slide-down">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Credit Balance</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <div className={`flex items-center space-x-3 mb-4 ${getStatusColor()}`}>
                <Icon name={getStatusIcon()} size={20} />
                <div>
                  <p className="font-mono text-lg font-semibold">
                    {credits?.toLocaleString()} credits
                  </p>
                  <p className="text-sm text-text-secondary">
                    {getCreditStatus() === 'empty' && 'No credits remaining'}
                    {getCreditStatus() === 'low' && 'Low credit balance'}
                    {getCreditStatus() === 'medium' && 'Moderate credit balance'}
                    {getCreditStatus() === 'high' && 'Good credit balance'}
                  </p>
                </div>
              </div>

              {(getCreditStatus() === 'empty' || getCreditStatus() === 'low') && (
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleUpgrade}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Credits
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default CreditBalanceIndicator;