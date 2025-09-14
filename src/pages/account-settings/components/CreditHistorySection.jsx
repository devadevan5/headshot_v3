import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * A component that displays the user's credit transaction history,
 * including usage, subscriptions, and adjustments.
 * It also provides a summary of the user's credit balance.
 *
 * @param {object} props - The properties for the component.
 * @param {number} [props.currentCredits=150] - The user's current credit balance.
 * @returns {JSX.Element} The rendered credit history section.
 */
const CreditHistorySection = ({ currentCredits = 150 }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const creditTransactions = [
    {
      id: 1,
      type: 'usage',
      amount: -1,
      description: 'Professional headshot generation',
      timestamp: '2025-09-14T07:30:00Z',
      details: 'Business suit with office background'
    },
    {
      id: 2,
      type: 'usage',
      amount: -1,
      description: 'Professional headshot generation',
      timestamp: '2025-09-14T07:15:00Z',
      details: 'Casual outfit with neutral background'
    },
    {
      id: 3,
      type: 'subscription',
      amount: 60,
      description: 'Monthly subscription renewal - Pro Plan',
      timestamp: '2025-09-14T00:00:00Z',
      details: 'Auto-renewal for September 2025'
    },
    {
      id: 4,
      type: 'usage',
      amount: -1,
      description: 'Professional headshot generation',
      timestamp: '2025-09-13T16:45:00Z',
      details: 'Formal dress with gradient background'
    },
    {
      id: 5,
      type: 'usage',
      amount: -1,
      description: 'Professional headshot generation',
      timestamp: '2025-09-13T14:20:00Z',
      details: 'Business casual with office background'
    },
    {
      id: 6,
      type: 'admin',
      amount: 5,
      description: 'Credit adjustment by admin',
      timestamp: '2025-09-12T10:30:00Z',
      details: 'Compensation for failed generation'
    },
    {
      id: 7,
      type: 'usage',
      amount: -1,
      description: 'Professional headshot generation',
      timestamp: '2025-09-12T09:15:00Z',
      details: 'Professional blazer with city background'
    },
    {
      id: 8,
      type: 'subscription',
      amount: 60,
      description: 'Monthly subscription renewal - Pro Plan',
      timestamp: '2025-08-14T00:00:00Z',
      details: 'Auto-renewal for August 2025'
    },
    {
      id: 9,
      type: 'bonus',
      amount: 2,
      description: 'Welcome bonus credits',
      timestamp: '2025-08-01T12:00:00Z',
      details: 'New user registration bonus'
    },
    {
      id: 10,
      type: 'usage',
      amount: -1,
      description: 'Professional headshot generation',
      timestamp: '2025-08-01T12:30:00Z',
      details: 'First headshot generation'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions', icon: 'List' },
    { value: 'usage', label: 'Usage', icon: 'Minus' },
    { value: 'subscription', label: 'Subscriptions', icon: 'CreditCard' },
    { value: 'admin', label: 'Adjustments', icon: 'Settings' },
    { value: 'bonus', label: 'Bonuses', icon: 'Gift' }
  ];

  /**
   * Returns the icon name for a given transaction type.
   * @param {string} type - The type of the transaction.
   * @returns {string} The name of the icon.
   */
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'usage':
        return 'Camera';
      case 'subscription':
        return 'CreditCard';
      case 'admin':
        return 'Settings';
      case 'bonus':
        return 'Gift';
      default:
        return 'Circle';
    }
  };

  /**
   * Returns the color class for a given transaction type and amount.
   * @param {string} type - The type of the transaction.
   * @param {number} amount - The amount of the transaction.
   * @returns {string} The color class.
   */
  const getTransactionColor = (type, amount) => {
    if (amount > 0) return 'text-success';
    if (type === 'usage') return 'text-text-secondary';
    return 'text-text-secondary';
  };

  /**
   * Formats a timestamp into a human-readable string.
   * @param {string} timestamp - The timestamp to format.
   * @returns {string} The formatted timestamp.
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date?.getFullYear() !== now?.getFullYear() ? 'numeric' : undefined
    });
  };

  const filteredTransactions = selectedFilter === 'all'
    ? creditTransactions
    : creditTransactions?.filter(t => t?.type === selectedFilter);

  const totalPages = Math.ceil(filteredTransactions?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions?.slice(startIndex, startIndex + itemsPerPage);

  const totalCreditsEarned = creditTransactions?.filter(t => t?.amount > 0)?.reduce((sum, t) => sum + t?.amount, 0);

  const totalCreditsUsed = Math.abs(creditTransactions?.filter(t => t?.amount < 0)?.reduce((sum, t) => sum + t?.amount, 0));

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Credit History</h2>
        <p className="text-sm text-text-secondary mt-1">
          Track your credit usage and subscription renewals
        </p>
      </div>
      {/* Credit Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Coins" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Current Balance</p>
              <p className="text-xl font-semibold text-foreground">{currentCredits}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Earned</p>
              <p className="text-xl font-semibold text-success">+{totalCreditsEarned}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Minus" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Used</p>
              <p className="text-xl font-semibold text-accent">-{totalCreditsUsed}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => {
              setSelectedFilter(option?.value);
              setCurrentPage(1);
            }}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedFilter === option?.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-text-secondary hover:text-foreground hover:bg-muted/80'
              }
            `}
          >
            <Icon name={option?.icon} size={16} />
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Transaction List */}
      <div className="space-y-3 mb-6">
        {paginatedTransactions?.length > 0 ? (
          paginatedTransactions?.map((transaction) => (
            <div
              key={transaction?.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                  <Icon
                    name={getTransactionIcon(transaction?.type)}
                    size={18}
                    className={getTransactionColor(transaction?.type, transaction?.amount)}
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction?.description}</p>
                  <p className="text-sm text-text-secondary">{transaction?.details}</p>
                  <p className="text-xs text-text-secondary">{formatDate(transaction?.timestamp)}</p>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${
                  transaction?.amount > 0 ? 'text-success' : 'text-text-secondary'
                }`}>
                  {transaction?.amount > 0 ? '+' : ''}{transaction?.amount}
                </p>
                <p className="text-xs text-text-secondary">
                  {transaction?.amount > 0 ? 'credits' : 'credit'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No transactions found for the selected filter</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions?.length)} of {filteredTransactions?.length} transactions
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200
                    ${currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditHistorySection;