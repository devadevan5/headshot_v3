import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CurrentPlanCard from './components/CurrentPlanCard';
import PlanComparisonCard from './components/PlanComparisonCard';
import BillingSection from './components/BillingSection';
import CreditUsageTracker from './components/CreditUsageTracker';
import CancellationModal from './components/CancellationModal';
import PlanChangeModal from './components/PlanChangeModal';

/**
 * The main page for managing subscriptions.
 * It displays the user's current plan, a comparison of available plans, billing information, and credit usage.
 *
 * @returns {JSX.Element} The rendered subscription management page.
 */
const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showPlanChangeModal, setShowPlanChangeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mock user data
  const currentUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 45,
    subscription: {
      id: "sub_1234567890",
      planId: "pro",
      planName: "Professional",
      price: 19.99,
      credits: 60,
      isActive: true,
      nextBillingDate: "2025-10-14",
      features: [
        "60 AI headshots per month",
        "Premium templates",
        "High resolution downloads",
        "Priority support",
        "Custom backgrounds"
      ]
    }
  };

  // Mock subscription plans
  const subscriptionPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 9.99,
      credits: 20,
      features: [
        '20 AI headshots per month',
        'Basic templates',
        'Standard resolution',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 19.99,
      credits: 60,
      features: [
        '60 AI headshots per month',
        'Premium templates',
        'High resolution downloads',
        'Priority support',
        'Custom backgrounds'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      credits: 120,
      features: [
        '120 AI headshots per month',
        'All templates',
        'Ultra-high resolution',
        'Dedicated support',
        'Custom backgrounds',
        'Bulk processing',
        'API access'
      ],
      popular: false,
      savings: 10
    }
  ];

  // Mock payment method
  const paymentMethod = {
    id: "pm_1234567890",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2027
  };

  // Mock transaction history
  const transactions = [
    {
      id: "pi_1234567890",
      date: "2025-09-14",
      description: "Professional Plan - Monthly",
      amount: 19.99,
      status: "succeeded",
      invoiceUrl: "https://example.com/invoice/1"
    },
    {
      id: "pi_1234567891",
      date: "2025-08-14",
      description: "Professional Plan - Monthly",
      amount: 19.99,
      status: "succeeded",
      invoiceUrl: "https://example.com/invoice/2"
    },
    {
      id: "pi_1234567892",
      date: "2025-07-14",
      description: "Professional Plan - Monthly",
      amount: 19.99,
      status: "succeeded",
      invoiceUrl: "https://example.com/invoice/3"
    },
    {
      id: "pi_1234567893",
      date: "2025-06-14",
      description: "Starter Plan - Monthly",
      amount: 9.99,
      status: "succeeded",
      invoiceUrl: "https://example.com/invoice/4"
    },
    {
      id: "pi_1234567894",
      date: "2025-05-14",
      description: "Starter Plan - Monthly",
      amount: 9.99,
      status: "failed",
      invoiceUrl: null
    }
  ];

  // Mock monthly usage
  const monthlyUsage = [
    {
      date: "2025-09-13",
      description: "Professional headshot generation",
      credits: 1
    },
    {
      date: "2025-09-12",
      description: "Business casual headshot",
      credits: 1
    },
    {
      date: "2025-09-10",
      description: "LinkedIn profile photo",
      credits: 1
    }
  ];

  /**
   * Handles the selection of a new subscription plan.
   * @param {object} plan - The selected plan.
   */
  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowPlanChangeModal(true);
  };

  /**
   * Handles the change of a subscription plan.
   * @param {object} newPlan - The new plan to change to.
   */
  const handlePlanChange = async (newPlan) => {
    setIsProcessing(true);
    try {
      // Simulate API call to change subscription
      console.log('Changing plan to:', newPlan);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real implementation, update user subscription state
      alert(`Successfully changed to ${newPlan?.name} plan!`);
    } catch (error) {
      console.error('Plan change failed:', error);
      alert('Failed to change plan. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handles the cancellation of a subscription.
   * @param {object} cancellationData - The cancellation data.
   */
  const handleCancellation = async (cancellationData) => {
    setIsProcessing(true);
    try {
      // Simulate API call to cancel subscription
      console.log('Cancelling subscription:', cancellationData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Subscription cancelled successfully. You\'ll retain access until your billing period ends.');
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('Failed to cancel subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handles the management of billing information.
   */
  const handleManageBilling = () => {
    // In real implementation, this would open Stripe Customer Portal
    console.log('Opening Stripe Customer Portal...');
    alert('This would open the Stripe Customer Portal for billing management.');
  };

  /**
   * Handles the update of a payment method.
   */
  const handleUpdatePayment = () => {
    // In real implementation, this would open Stripe payment method update
    console.log('Opening payment method update...');
    alert('This would open the payment method update form.');
  };

  /**
   * Handles the download of an invoice.
   * @param {string} invoiceUrl - The URL of the invoice to download.
   */
  const handleDownloadInvoice = (invoiceUrl) => {
    // In real implementation, this would download the invoice
    console.log('Downloading invoice:', invoiceUrl);
    alert('Invoice download started.');
  };

  /**
   * Calculates the proration for a plan change.
   * @param {object} currentPlan - The user's current plan.
   * @param {object} newPlan - The new plan to change to.
   * @returns {number} The proration amount.
   */
  const calculateProration = (currentPlan, newPlan) => {
    // Simple proration calculation (in real app, this would come from Stripe)
    const priceDiff = newPlan?.price - currentPlan?.price;
    const daysRemaining = 20; // Mock days remaining in billing period
    const daysInMonth = 30;
    return (priceDiff * daysRemaining) / daysInMonth;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        userCredits={currentUser?.credits}
        userName={currentUser?.name}
        userEmail={currentUser?.email}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-foreground transition-colors duration-200"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Subscription Management</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Subscription Management
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your subscription, billing, and credit usage
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan */}
            <CurrentPlanCard
              currentPlan={currentUser?.subscription}
              nextBillingDate={currentUser?.subscription?.nextBillingDate}
              isActive={currentUser?.subscription?.isActive}
              onManageBilling={handleManageBilling}
              onCancelSubscription={() => setShowCancellationModal(true)}
            />

            {/* Plan Comparison */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Available Plans
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {subscriptionPlans?.map((plan) => (
                  <PlanComparisonCard
                    key={plan?.id}
                    plan={plan}
                    isCurrentPlan={plan?.id === currentUser?.subscription?.planId}
                    onSelectPlan={handlePlanSelection}
                    isProcessing={isProcessing}
                  />
                ))}
              </div>
            </div>

            {/* Billing Section */}
            <BillingSection
              paymentMethod={paymentMethod}
              transactions={transactions}
              onUpdatePayment={handleUpdatePayment}
              onDownloadInvoice={handleDownloadInvoice}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credit Usage Tracker */}
            <CreditUsageTracker
              currentCredits={currentUser?.credits}
              totalCredits={currentUser?.subscription?.credits}
              monthlyUsage={monthlyUsage}
              resetDate={currentUser?.subscription?.nextBillingDate}
            />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/headshot-generation')}
                  iconName="Camera"
                  iconPosition="left"
                >
                  Generate Headshot
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/dashboard')}
                  iconName="Images"
                  iconPosition="left"
                >
                  View Gallery
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/account-settings')}
                  iconName="Settings"
                  iconPosition="left"
                >
                  Account Settings
                </Button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Have questions about your subscription or billing?
              </p>
              <Button
                variant="outline"
                fullWidth
                iconName="HelpCircle"
                iconPosition="left"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <CancellationModal
        isOpen={showCancellationModal}
        onClose={() => setShowCancellationModal(false)}
        onConfirmCancellation={handleCancellation}
        currentPlan={currentUser?.subscription}
        nextBillingDate={currentUser?.subscription?.nextBillingDate}
      />
      <PlanChangeModal
        isOpen={showPlanChangeModal}
        onClose={() => setShowPlanChangeModal(false)}
        onConfirmChange={handlePlanChange}
        currentPlan={currentUser?.subscription}
        newPlan={selectedPlan}
        prorationAmount={selectedPlan ? calculateProration(currentUser?.subscription, selectedPlan) : 0}
        nextBillingDate={currentUser?.subscription?.nextBillingDate}
      />
    </div>
  );
};

export default SubscriptionManagement;