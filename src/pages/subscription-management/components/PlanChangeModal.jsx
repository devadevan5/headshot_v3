import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * A modal component that allows users to confirm a change to their subscription plan.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - A function to close the modal.
 * @param {function} props.onConfirmChange - A function to be called when the user confirms the plan change.
 * @param {object} props.currentPlan - The user's current subscription plan.
 * @param {object} props.newPlan - The new subscription plan.
 * @param {number} props.prorationAmount - The proration amount for the plan change.
 * @param {string} props.nextBillingDate - The date of the user's next billing.
 * @returns {JSX.Element | null} The rendered plan change modal or null if it is not open.
 */
const PlanChangeModal = ({
  isOpen,
  onClose,
  onConfirmChange,
  currentPlan,
  newPlan,
  prorationAmount,
  nextBillingDate
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const isUpgrade = newPlan?.price > currentPlan?.price;
  const isDowngrade = newPlan?.price < currentPlan?.price;

  /**
   * Handles the confirmation of the plan change.
   */
  const handlePlanChange = async () => {
    setIsProcessing(true);
    try {
      await onConfirmChange(newPlan);
      onClose();
    } catch (error) {
      console.error('Plan change failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

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

  if (!isOpen || !newPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-background rounded-xl shadow-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Change'} Plan
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Confirm your plan change
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Plan Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Current Plan */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-center">
                <h3 className="font-medium text-text-secondary mb-2">Current</h3>
                <div className="text-lg font-semibold text-foreground">
                  {currentPlan?.name}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ${currentPlan?.price}
                </div>
                <div className="text-sm text-text-secondary">per month</div>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Icon name="Coins" size={14} className="text-accent" />
                  <span className="text-sm text-accent">
                    {currentPlan?.credits} credits
                  </span>
                </div>
              </div>
            </div>

            {/* New Plan */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="text-center">
                <h3 className="font-medium text-primary mb-2">New</h3>
                <div className="text-lg font-semibold text-foreground">
                  {newPlan?.name}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ${newPlan?.price}
                </div>
                <div className="text-sm text-text-secondary">per month</div>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Icon name="Coins" size={14} className="text-accent" />
                  <span className="text-sm text-accent">
                    {newPlan?.credits} credits
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">
              Billing Changes
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Effective Date:</span>
                <span className="text-foreground font-medium">Immediately</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Next Billing Date:</span>
                <span className="text-foreground font-medium">
                  {formatDate(nextBillingDate)}
                </span>
              </div>
              {prorationAmount !== 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">
                    {isUpgrade ? 'Prorated Charge:' : 'Prorated Credit:'}
                  </span>
                  <span className={`font-medium ${isUpgrade ? 'text-foreground' : 'text-success'}`}>
                    {isUpgrade ? '+' : '-'}${Math.abs(prorationAmount)?.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Feature Changes */}
          <div>
            <h3 className="font-medium text-foreground mb-3">
              What Changes
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon
                  name={isUpgrade ? "ArrowUp" : "ArrowDown"}
                  size={16}
                  className={isUpgrade ? "text-success" : "text-warning"}
                />
                <span className="text-sm text-foreground">
                  Monthly credits: {currentPlan?.credits} → {newPlan?.credits}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name={isUpgrade ? "ArrowUp" : "ArrowDown"}
                  size={16}
                  className={isUpgrade ? "text-success" : "text-warning"}
                />
                <span className="text-sm text-foreground">
                  Monthly cost: ${currentPlan?.price} → ${newPlan?.price}
                </span>
              </div>
              {newPlan?.features && (
                <div className="mt-3">
                  <div className="text-sm text-text-secondary mb-2">
                    {newPlan?.name} includes:
                  </div>
                  <div className="space-y-1">
                    {newPlan?.features?.slice(0, 3)?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} className="text-success" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Important Notes */}
          {isDowngrade && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Important Note
                  </h4>
                  <p className="text-sm text-text-secondary">
                    When downgrading, any unused credits above your new plan's limit will be lost at the end of your current billing period.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handlePlanChange}
            loading={isProcessing}
            iconName={isUpgrade ? "ArrowUp" : "ArrowDown"}
            iconPosition="left"
          >
            {isProcessing
              ? 'Processing...'
              : `Confirm ${isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Change'}`
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanChangeModal;