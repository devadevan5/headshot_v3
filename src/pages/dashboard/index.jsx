import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PaywallModal from '../../components/ui/PaywallModal';
import CreditBalanceCard from './components/CreditBalanceCard';
import CreateHeadshotCard from './components/CreateHeadshotCard';
import HeadshotGallery from './components/HeadshotGallery';
import AccountSummaryCard from './components/AccountSummaryCard';
import QuickStatsCard from './components/QuickStatsCard';

/**
 * The main dashboard for the application.
 * It displays user information, credit balance, and a gallery of generated headshots.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallTrigger, setPaywallTrigger] = useState('manual');

  // Mock user data - in real app, this would come from context/API
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 15,
    subscriptionTier: "Pro",
    isActive: true,
    nextBillingDate: new Date('2025-02-14'),
    joinDate: new Date('2024-11-15'),
    totalHeadshots: 8,
    thisMonthHeadshots: 3,
    totalDownloads: 12,
    averageRating: 4.6
  });

  useEffect(() => {
    if (userData?.credits === 0) {
      setPaywallTrigger('zero_credits');
      setShowPaywall(true);
    } else if (userData?.credits <= 5) {
      // Could show low credits warning
      console.log('Low credits warning');
    }
  }, [userData?.credits]);

  /**
   * Handles the upgrade process by showing the paywall modal.
   */
  const handleUpgrade = () => {
    if (userData?.credits === 0) {
      setPaywallTrigger('zero_credits');
    } else if (userData?.credits <= 5) {
      setPaywallTrigger('low_credits');
    } else {
      setPaywallTrigger('manual');
    }
    setShowPaywall(true);
  };

  /**
   * Handles the upgrade of a subscription plan.
   * @param {string} planId - The ID of the plan to upgrade to.
   */
  const handlePaywallUpgrade = async (planId) => {
    try {
      // Simulate upgrade process
      console.log('Upgrading to plan:', planId);

      // Mock credit addition based on plan
      const creditMap = {
        'starter': 100,
        'pro': 250,
        'business': 500
      };

      setUserData(prev => ({
        ...prev,
        credits: prev?.credits + (creditMap?.[planId] || 100),
        subscriptionTier: planId?.charAt(0)?.toUpperCase() + planId?.slice(1)
      }));

      setShowPaywall(false);
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  /**
   * Handles the download of a headshot.
   * @param {object} headshot - The headshot to download.
   */
  const handleDownloadHeadshot = (headshot) => {
    console.log('Downloading headshot:', headshot?.id);
    // Implement download logic
  };

  /**
   * Handles the deletion of a headshot.
   * @param {object} headshot - The headshot to delete.
   */
  const handleDeleteHeadshot = (headshot) => {
    console.log('Deleting headshot:', headshot?.id);
    // Implement delete logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={true}
        userCredits={userData?.credits}
        userName={userData?.name}
        userEmail={userData?.email}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userData?.name?.split(' ')?.[0]}!
          </h1>
          <p className="text-text-secondary">
            Ready to create more professional headshots? Let's get started.
          </p>
        </div>

        {/* Top Section - Credits and Create */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <CreditBalanceCard
              credits={userData?.credits}
              subscriptionTier={userData?.subscriptionTier}
              onUpgrade={handleUpgrade}
            />
          </div>
          <div className="lg:col-span-2">
            <CreateHeadshotCard
              credits={userData?.credits}
              disabled={userData?.credits === 0}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <QuickStatsCard
            totalHeadshots={userData?.totalHeadshots}
            thisMonthHeadshots={userData?.thisMonthHeadshots}
            totalDownloads={userData?.totalDownloads}
            averageRating={userData?.averageRating}
          />
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Gallery */}
          <div className="lg:col-span-2">
            <HeadshotGallery
              onDownload={handleDownloadHeadshot}
              onDelete={handleDeleteHeadshot}
            />
          </div>

          {/* Account Summary */}
          <div className="lg:col-span-1">
            <AccountSummaryCard
              subscriptionTier={userData?.subscriptionTier}
              nextBillingDate={userData?.nextBillingDate}
              isActive={userData?.isActive}
              totalHeadshots={userData?.totalHeadshots}
              joinDate={userData?.joinDate}
            />
          </div>
        </div>

        {/* Mobile-specific bottom spacing */}
        <div className="h-8 lg:hidden" />
      </main>
      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={handlePaywallUpgrade}
        currentCredits={userData?.credits}
        trigger={paywallTrigger}
      />
    </div>
  );
};

export default Dashboard;