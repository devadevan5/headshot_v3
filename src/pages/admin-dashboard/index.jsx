import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavigationSidebar from '../../components/ui/AdminNavigationSidebar';
import MetricsCard from './components/MetricsCard';
import ContentManagementTab from './components/ContentManagementTab';
import PromptManagementSection from './components/PromptManagementSection';
import UserManagementTab from './components/UserManagementTab';
import SystemMonitoringTab from './components/SystemMonitoringTab';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Mock metrics data
  const metricsData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Active registered users'
    },
    {
      title: 'Active Subscriptions',
      value: '1,234',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'CreditCard',
      description: 'Paying subscribers'
    },
    {
      title: 'Daily Generations',
      value: '456',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'Camera',
      description: 'Headshots generated today'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,680',
      change: '+15.7%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Revenue this month'
    }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3',
      description: 'System metrics and key performance indicators'
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: 'FileImage',
      description: 'Manage outfits, backgrounds, and prompts'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage users, credits, and subscriptions'
    },
    {
      id: 'monitoring',
      label: 'System Monitoring',
      icon: 'Activity',
      description: 'Monitor transactions, webhooks, and feedback'
    }
  ];

  // Simulate loading metrics
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetricsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  description={metric?.description}
                  loading={metricsLoading}
                />
              ))}
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('content')}
                >
                  Add Content
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={() => setActiveTab('users')}
                >
                  Manage Users
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => console.log('System settings')}
                >
                  System Settings
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export reports')}
                >
                  Export Reports
                </Button>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    action: 'New user registration',
                    user: 'john.doe@example.com',
                    timestamp: '2 minutes ago',
                    icon: 'UserPlus',
                    color: 'text-success'
                  },
                  {
                    action: 'Subscription upgraded',
                    user: 'sarah.wilson@company.com',
                    timestamp: '15 minutes ago',
                    icon: 'CreditCard',
                    color: 'text-primary'
                  },
                  {
                    action: 'Headshot generated',
                    user: 'mike.johnson@startup.io',
                    timestamp: '32 minutes ago',
                    icon: 'Camera',
                    color: 'text-accent'
                  },
                  {
                    action: 'Feedback submitted',
                    user: 'emma.brown@freelance.com',
                    timestamp: '1 hour ago',
                    icon: 'MessageSquare',
                    color: 'text-text-secondary'
                  }
                ]?.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${activity?.color}`}>
                      <Icon name={activity?.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity?.action}</p>
                      <p className="text-xs text-text-secondary">{activity?.user}</p>
                    </div>
                    <span className="text-xs text-text-secondary">{activity?.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-8">
            <ContentManagementTab />
            <PromptManagementSection />
          </div>
        );

      case 'users':
        return <UserManagementTab />;

      case 'monitoring':
        return <SystemMonitoringTab />;

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Headshot.com</title>
        <meta name="description" content="Comprehensive admin dashboard for managing users, content, and system monitoring" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <AdminNavigationSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* Header */}
          <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
                  <p className="text-text-secondary">
                    {tabs?.find(tab => tab?.id === activeTab)?.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    iconName={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="lg:hidden"
                  />
                  
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Clock" size={16} />
                    <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Tab Navigation */}
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <nav className="flex space-x-1 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-sm border border-border'
                      : 'text-text-secondary hover:text-foreground hover:bg-background/50'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <main className="p-6">
            {renderTabContent()}
          </main>
        </div>

        {/* Mobile Overlay */}
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;