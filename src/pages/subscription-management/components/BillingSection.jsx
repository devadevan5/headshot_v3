import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * A component that displays the user's payment method and transaction history.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.paymentMethod - The user's payment method.
 * @param {Array<object>} props.transactions - An array of transaction objects.
 * @param {function} props.onUpdatePayment - A function to be called when the user clicks the "Update" button.
 * @param {function} props.onDownloadInvoice - A function to be called when the user clicks the "Download" button.
 * @returns {JSX.Element} The rendered billing section.
 */
const BillingSection = ({
  paymentMethod,
  transactions,
  onUpdatePayment,
  onDownloadInvoice
}) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const displayedTransactions = showAllTransactions
    ? transactions
    : transactions?.slice(0, 5);

  /**
   * Formats a date string into a human-readable format.
   * @param {string} dateString - The date string to format.
   * @returns {string} The formatted date.
   */
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Returns the color class for a given status.
   * @param {string} status - The status to get the color for.
   * @returns {string} The color class.
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  /**
   * Returns the icon name for a given status.
   * @param {string} status - The status to get the icon for.
   * @returns {string} The icon name.
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case 'succeeded':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Payment Method
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onUpdatePayment}
            iconName="Edit"
            iconPosition="left"
          >
            Update
          </Button>
        </div>

        {paymentMethod ? (
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
              <Icon
                name={paymentMethod?.brand === 'visa' ? 'CreditCard' : 'CreditCard'}
                size={20}
                className="text-text-secondary"
              />
            </div>
            <div>
              <div className="font-medium text-foreground">
                •••• •••• •••• {paymentMethod?.last4}
              </div>
              <div className="text-sm text-text-secondary">
                {paymentMethod?.brand?.toUpperCase()} • Expires {paymentMethod?.expMonth}/{paymentMethod?.expYear}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Icon name="CreditCard" size={48} className="text-text-secondary mx-auto mb-2" />
            <p className="text-text-secondary">No payment method on file</p>
            <Button
              variant="default"
              size="sm"
              onClick={onUpdatePayment}
              iconName="Plus"
              iconPosition="left"
              className="mt-2"
            >
              Add Payment Method
            </Button>
          </div>
        )}
      </div>
      {/* Transaction History */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Billing History
          </h3>
          {transactions?.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTransactions(!showAllTransactions)}
            >
              {showAllTransactions ? 'Show Less' : 'Show All'}
            </Button>
          )}
        </div>

        {transactions?.length > 0 ? (
          <div className="space-y-1">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 py-2 text-sm font-medium text-text-secondary border-b border-border">
              <div>Date</div>
              <div>Description</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Invoice</div>
            </div>

            {/* Transaction Rows */}
            {displayedTransactions?.map((transaction) => (
              <div key={transaction?.id}>
                {/* Desktop Row */}
                <div className="hidden md:grid grid-cols-5 gap-4 py-3 text-sm hover:bg-muted/50 rounded-lg transition-colors duration-200">
                  <div className="text-foreground">
                    {formatDate(transaction?.date)}
                  </div>
                  <div className="text-foreground">
                    {transaction?.description}
                  </div>
                  <div className="font-medium text-foreground">
                    ${transaction?.amount?.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name={getStatusIcon(transaction?.status)}
                      size={14}
                      className={getStatusColor(transaction?.status)}
                    />
                    <span className={`capitalize ${getStatusColor(transaction?.status)}`}>
                      {transaction?.status}
                    </span>
                  </div>
                  <div>
                    {transaction?.invoiceUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownloadInvoice(transaction?.invoiceUrl)}
                        iconName="Download"
                        iconPosition="left"
                      >
                        Download
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden bg-muted/30 rounded-lg p-4 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-foreground">
                      {transaction?.description}
                    </div>
                    <div className="font-semibold text-foreground">
                      ${transaction?.amount?.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-text-secondary">
                      {formatDate(transaction?.date)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Icon
                          name={getStatusIcon(transaction?.status)}
                          size={14}
                          className={getStatusColor(transaction?.status)}
                        />
                        <span className={`capitalize ${getStatusColor(transaction?.status)}`}>
                          {transaction?.status}
                        </span>
                      </div>
                      {transaction?.invoiceUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDownloadInvoice(transaction?.invoiceUrl)}
                          iconName="Download"
                          iconSize={14}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-text-secondary mx-auto mb-2" />
            <p className="text-text-secondary">No billing history available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSection;