import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SystemMonitoringTab = () => {
  const [activeSection, setActiveSection] = useState('transactions');
  const [timeFilter, setTimeFilter] = useState('24h');

  const transactionData = [
    {
      id: "txn_1234567890",
      user: "john.doe@example.com",
      amount: 19.99,
      plan: "Pro",
      status: "completed",
      timestamp: "2025-01-14 07:45:23",
      stripeId: "pi_1234567890abcdef"
    },
    {
      id: "txn_1234567891",
      user: "sarah.wilson@company.com",
      amount: 9.99,
      plan: "Starter",
      status: "completed",
      timestamp: "2025-01-14 06:32:15",
      stripeId: "pi_1234567891abcdef"
    },
    {
      id: "txn_1234567892",
      user: "mike.johnson@startup.io",
      amount: 29.99,
      plan: "Premium",
      status: "failed",
      timestamp: "2025-01-14 05:18:47",
      stripeId: "pi_1234567892abcdef"
    },
    {
      id: "txn_1234567893",
      user: "emma.brown@freelance.com",
      amount: 19.99,
      plan: "Pro",
      status: "pending",
      timestamp: "2025-01-14 04:22:11",
      stripeId: "pi_1234567893abcdef"
    }
  ];

  const webhookData = [
    {
      id: "wh_1234567890",
      event: "payment_intent.succeeded",
      status: "success",
      timestamp: "2025-01-14 07:45:25",
      attempts: 1,
      response: "200 OK"
    },
    {
      id: "wh_1234567891",
      event: "customer.subscription.created",
      status: "success",
      timestamp: "2025-01-14 06:32:17",
      attempts: 1,
      response: "200 OK"
    },
    {
      id: "wh_1234567892",
      event: "payment_intent.payment_failed",
      status: "failed",
      timestamp: "2025-01-14 05:18:49",
      attempts: 3,
      response: "500 Internal Server Error"
    },
    {
      id: "wh_1234567893",
      event: "invoice.payment_succeeded",
      status: "success",
      timestamp: "2025-01-14 04:22:13",
      attempts: 1,
      response: "200 OK"
    }
  ];

  const feedbackData = [
    {
      id: 1,
      user: "john.doe@example.com",
      rating: 5,
      comment: "Amazing quality! The headshots look incredibly professional.",
      timestamp: "2025-01-14 07:30:15",
      status: "published"
    },
    {
      id: 2,
      user: "sarah.wilson@company.com",
      rating: 4,
      comment: "Great service, though processing took a bit longer than expected.",
      timestamp: "2025-01-14 06:15:42",
      status: "published"
    },
    {
      id: 3,
      user: "mike.johnson@startup.io",
      rating: 2,
      comment: "The background didn\'t match what I selected. Needs improvement.",
      timestamp: "2025-01-14 05:45:18",
      status: "pending"
    },
    {
      id: 4,
      user: "emma.brown@freelance.com",
      rating: 5,
      comment: "Perfect for my LinkedIn profile. Highly recommend!",
      timestamp: "2025-01-14 04:20:33",
      status: "published"
    }
  ];

  const timeFilterOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'success': case'published':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-accent fill-current' : 'text-text-secondary'}
      />
    ));
  };

  const renderTransactions = () => (
    <div className="space-y-4">
      {transactionData?.map((transaction) => (
        <div key={transaction?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{transaction?.user}</h3>
                <p className="text-sm text-text-secondary">{transaction?.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">${transaction?.amount}</p>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction?.status)}`}>
                {transaction?.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Plan:</span>
              <p className="font-medium text-foreground">{transaction?.plan}</p>
            </div>
            <div>
              <span className="text-text-secondary">Stripe ID:</span>
              <p className="font-mono text-xs text-foreground">{transaction?.stripeId}</p>
            </div>
            <div>
              <span className="text-text-secondary">Timestamp:</span>
              <p className="text-foreground">{transaction?.timestamp}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                onClick={() => console.log(`View in Stripe: ${transaction?.stripeId}`)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => console.log(`Download receipt: ${transaction?.id}`)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWebhooks = () => (
    <div className="space-y-4">
      {webhookData?.map((webhook) => (
        <div key={webhook?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                webhook?.status === 'success' ? 'bg-success/10' : 'bg-error/10'
              }`}>
                <Icon 
                  name={webhook?.status === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                  size={20} 
                  className={webhook?.status === 'success' ? 'text-success' : 'text-error'} 
                />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{webhook?.event}</h3>
                <p className="text-sm text-text-secondary">{webhook?.id}</p>
              </div>
            </div>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(webhook?.status)}`}>
              {webhook?.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Attempts:</span>
              <p className="font-medium text-foreground">{webhook?.attempts}</p>
            </div>
            <div>
              <span className="text-text-secondary">Response:</span>
              <p className="text-foreground">{webhook?.response}</p>
            </div>
            <div>
              <span className="text-text-secondary">Timestamp:</span>
              <p className="text-foreground">{webhook?.timestamp}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                onClick={() => console.log(`Retry webhook: ${webhook?.id}`)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => console.log(`View details: ${webhook?.id}`)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-4">
      {feedbackData?.map((feedback) => (
        <div key={feedback?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {feedback?.user?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">{feedback?.user}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  {getRatingStars(feedback?.rating)}
                  <span className="text-sm text-text-secondary ml-2">({feedback?.rating}/5)</span>
                </div>
              </div>
            </div>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(feedback?.status)}`}>
              {feedback?.status}
            </span>
          </div>
          
          <div className="mb-3">
            <p className="text-foreground">{feedback?.comment}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">{feedback?.timestamp}</span>
            <div className="flex items-center space-x-2">
              {feedback?.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Check"
                    onClick={() => console.log(`Approve feedback: ${feedback?.id}`)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    onClick={() => console.log(`Reject feedback: ${feedback?.id}`)}
                  >
                    Reject
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageSquare"
                onClick={() => console.log(`Reply to feedback: ${feedback?.id}`)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveSection('transactions')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeSection === 'transactions' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveSection('webhooks')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeSection === 'webhooks' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
            }`}
          >
            Webhooks
          </button>
          <button
            onClick={() => setActiveSection('feedback')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeSection === 'feedback' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
            }`}
          >
            Feedback
          </button>
        </div>

        <Select
          options={timeFilterOptions}
          value={timeFilter}
          onChange={setTimeFilter}
          className="w-48"
        />
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground capitalize">
            {activeSection} {activeSection === 'feedback' ? 'Management' : 'Log'}
          </h3>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => console.log(`Refresh ${activeSection}`)}
          >
            Refresh
          </Button>
        </div>

        {activeSection === 'transactions' && renderTransactions()}
        {activeSection === 'webhooks' && renderWebhooks()}
        {activeSection === 'feedback' && renderFeedback()}
      </div>
    </div>
  );
};

export default SystemMonitoringTab;