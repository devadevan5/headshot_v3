import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

/**
 * @typedef {'manual' | 'zero_credits' | 'low_credits'} PaywallTrigger
 */

/**
 * A modal component that prompts the user to upgrade their plan.
 * It can be triggered manually, when the user runs out of credits, or when their credit balance is low.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} [props.isOpen=false] - Whether the modal is open.
 * @param {function} props.onClose - A function to close the modal.
 * @param {function} props.onUpgrade - A function to handle the upgrade process.
 * @param {number} [props.currentCredits=0] - The user's current credit balance.
 * @param {PaywallTrigger} [props.trigger='manual'] - The trigger that opened the modal.
 * @returns {JSX.Element | null} The rendered paywall modal or null if it is not open.
 */
const PaywallModal = ({
  isOpen = false,
  onClose,
  onUpgrade,
  currentCredits = 0,
  trigger = 'manual'
}) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);

  const subscriptionPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      credits: 100,
      features: [
        '100 AI headshots',
        'Basic templates',
        'Standard resolution',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 59,
      credits: 250,
      features: [
        '250 AI headshots',
        'Premium templates',
        'High resolution',
        'Priority support',
        'Custom backgrounds'
      ],
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      price: 99,
      credits: 500,
      features: [
        '500 AI headshots',
        'All templates',
        'Ultra-high resolution',
        'Dedicated support',
        'Custom backgrounds',
        'Bulk processing'
      ],
      popular: false
    }
  ];

  useEffect(() => {
    /**
     * Handles the escape key press to close the modal.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  /**
   * Returns the title for the modal based on the trigger.
   * @returns {string} The modal title.
   */
  const getModalTitle = () => {
    switch (trigger) {
      case 'zero_credits':
        return 'Out of Credits';
      case 'low_credits':
        return 'Running Low on Credits';
      default:
        return 'Upgrade Your Plan';
    }
  };

  /**
   * Returns the description for the modal based on the trigger.
   * @returns {string} The modal description.
   */
  const getModalDescription = () => {
    switch (trigger) {
      case 'zero_credits':
        return 'You\'ve used all your credits. Upgrade to continue creating professional headshots.';
      case 'low_credits':
        return `You have ${currentCredits} credits remaining. Upgrade now to avoid interruptions.`;
      default:
        return 'Choose a plan that fits your needs and start creating professional headshots.';
    }
  };

  /**
   * Handles the upgrade process.
   */
  const handleUpgrade = async () => {
    setIsProcessing(true);

    try {
      if (onUpgrade) {
        await onUpgrade(selectedPlan);
      } else {
        // Default upgrade behavior - integrate with Stripe or payment processor
        console.log('Upgrading to plan:', selectedPlan);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      onClose();
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-background rounded-xl shadow-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {getModalTitle()}
            </h2>
            <p className="text-text-secondary mt-1">
              {getModalDescription()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            disabled={isProcessing}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Current Status (if applicable) */}
        {(trigger === 'zero_credits' || trigger === 'low_credits') && (
          <div className="p-6 bg-muted/50 border-b border-border">
            <div className="flex items-center space-x-3">
              <Icon
                name={trigger === 'zero_credits' ? 'AlertCircle' : 'AlertTriangle'}
                size={20}
                className={trigger === 'zero_credits' ? 'text-error' : 'text-warning'}
              />
              <div>
                <p className="font-medium text-foreground">
                  Current Balance: <span className="font-mono">{currentCredits} credits</span>
                </p>
                <p className="text-sm text-text-secondary">
                  {trigger === 'zero_credits' ?'You need credits to continue generating headshots' :'Consider upgrading to avoid running out of credits'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Plans */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionPlans?.map((plan) => (
              <div
                key={plan?.id}
                className={`
                  relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${selectedPlan === plan?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                  ${plan?.popular ? 'ring-2 ring-accent ring-opacity-20' : ''}
                `}
                onClick={() => setSelectedPlan(plan?.id)}
              >
                {plan?.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {plan?.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      ${plan?.price}
                    </span>
                    <span className="text-text-secondary ml-1">/month</span>
                  </div>
                  <p className="text-accent font-medium mt-1">
                    {plan?.credits?.toLocaleString()} credits included
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-center">
                  <div className={`
                    w-4 h-4 rounded-full border-2 transition-all duration-200
                    ${selectedPlan === plan?.id
                      ? 'border-primary bg-primary' :'border-border'
                    }
                  `}>
                    {selectedPlan === plan?.id && (
                      <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            <p>✓ Cancel anytime • ✓ Secure payment • ✓ Instant access</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Maybe Later
            </Button>
            <Button
              variant="default"
              onClick={handleUpgrade}
              loading={isProcessing}
              iconName="CreditCard"
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : `Upgrade to ${subscriptionPlans?.find(p => p?.id === selectedPlan)?.name}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;