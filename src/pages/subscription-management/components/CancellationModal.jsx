import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CancellationModal = ({ 
  isOpen, 
  onClose, 
  onConfirmCancellation,
  currentPlan,
  nextBillingDate 
}) => {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [confirmUnderstanding, setConfirmUnderstanding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const cancellationReasons = [
    { value: 'too_expensive', label: 'Too expensive' },
    { value: 'not_using', label: 'Not using enough' },
    { value: 'found_alternative', label: 'Found a better alternative' },
    { value: 'technical_issues', label: 'Technical issues' },
    { value: 'temporary_pause', label: 'Temporary pause' },
    { value: 'other', label: 'Other reason' }
  ];

  const handleCancellation = async () => {
    if (!confirmUnderstanding) return;
    
    setIsProcessing(true);
    try {
      await onConfirmCancellation({
        reason,
        feedback: feedback?.trim()
      });
      onClose();
    } catch (error) {
      console.error('Cancellation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="relative w-full max-w-md mx-4 bg-background rounded-xl shadow-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Cancel Subscription
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              We're sorry to see you go
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
          {/* Important Information */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Before you cancel
                </h3>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Your {currentPlan?.name} plan will remain active until {formatDate(nextBillingDate)}</li>
                  <li>• You'll keep access to all features until then</li>
                  <li>• Unused credits will be lost after cancellation</li>
                  <li>• You can reactivate anytime before the period ends</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Help us improve - Why are you cancelling?
            </label>
            <div className="space-y-2">
              {cancellationReasons?.map((reasonOption) => (
                <label key={reasonOption?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cancellation_reason"
                    value={reasonOption?.value}
                    checked={reason === reasonOption?.value}
                    onChange={(e) => setReason(e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">
                    {reasonOption?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional feedback (optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e?.target?.value)}
              placeholder="Tell us more about your experience..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Confirmation Checkbox */}
          <div>
            <Checkbox
              checked={confirmUnderstanding}
              onChange={(e) => setConfirmUnderstanding(e?.target?.checked)}
              label="I understand that my subscription will be cancelled and I'll lose access after the current billing period ends"
              className="text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Keep Subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancellation}
            loading={isProcessing}
            disabled={!confirmUnderstanding}
            iconName="X"
            iconPosition="left"
          >
            {isProcessing ? 'Cancelling...' : 'Cancel Subscription'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;