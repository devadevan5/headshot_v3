import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminNavigationSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    users: false,
    content: false,
    system: false
  });

  const navigationSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      items: [
        {
          label: 'Overview',
          path: '/admin-dashboard',
          icon: 'BarChart3',
          description: 'System metrics and analytics'
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      items: [
        {
          label: 'All Users',
          path: '/admin-dashboard/users',
          icon: 'UserCheck',
          description: 'Manage user accounts'
        },
        {
          label: 'Subscriptions',
          path: '/admin-dashboard/subscriptions',
          icon: 'CreditCard',
          description: 'Subscription management'
        },
        {
          label: 'Credits',
          path: '/admin-dashboard/credits',
          icon: 'Coins',
          description: 'Credit system management'
        }
      ]
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: 'FileImage',
      items: [
        {
          label: 'Headshots',
          path: '/admin-dashboard/headshots',
          icon: 'Camera',
          description: 'Generated headshot management'
        },
        {
          label: 'Templates',
          path: '/admin-dashboard/templates',
          icon: 'Layout',
          description: 'Headshot templates'
        },
        {
          label: 'Moderation',
          path: '/admin-dashboard/moderation',
          icon: 'Shield',
          description: 'Content moderation queue'
        }
      ]
    },
    {
      id: 'system',
      label: 'System',
      icon: 'Settings',
      items: [
        {
          label: 'AI Models',
          path: '/admin-dashboard/ai-models',
          icon: 'Brain',
          description: 'AI model configuration'
        },
        {
          label: 'Analytics',
          path: '/admin-dashboard/analytics',
          icon: 'TrendingUp',
          description: 'System analytics'
        },
        {
          label: 'Settings',
          path: '/admin-dashboard/settings',
          icon: 'Cog',
          description: 'System configuration'
        }
      ]
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const toggleSection = (sectionId) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogoClick = () => {
    navigate('/admin-dashboard');
  };

  return (
    <aside className={`
      fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-out
      ${isCollapsed ? 'w-16' : 'w-64'}
      lg:translate-x-0
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div 
            className={`flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80 ${isCollapsed ? 'justify-center' : ''}`}
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <span className="text-lg font-semibold text-foreground">Admin Portal</span>
                <p className="text-xs text-text-secondary">Headshot.com</p>
              </div>
            )}
          </div>
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={`p-1.5 rounded-lg hover:bg-muted transition-colors duration-200 ${isCollapsed ? 'hidden' : ''}`}
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2">
            {navigationSections?.map((section) => (
              <div key={section?.id} className="px-3">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section?.id)}
                  className={`
                    flex items-center w-full px-3 py-2 text-left rounded-lg transition-all duration-200
                    ${isCollapsed ? 'justify-center' : 'justify-between'}
                    hover:bg-muted text-text-secondary hover:text-foreground
                  `}
                  title={isCollapsed ? section?.label : ''}
                >
                  <div className="flex items-center">
                    <Icon name={section?.icon} size={18} />
                    {!isCollapsed && (
                      <span className="ml-3 text-sm font-medium">{section?.label}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Icon 
                      name="ChevronDown" 
                      size={14} 
                      className={`transition-transform duration-200 ${
                        expandedSections?.[section?.id] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Section Items */}
                {(!isCollapsed && expandedSections?.[section?.id]) && (
                  <div className="mt-1 space-y-1">
                    {section?.items?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`
                          flex items-center w-full px-6 py-2 text-left rounded-lg transition-all duration-200
                          ${isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-text-secondary hover:text-foreground hover:bg-muted'
                          }
                        `}
                        title={item?.description}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span className="ml-3 text-sm">{item?.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Collapsed Section Items */}
                {isCollapsed && (
                  <div className="mt-1 space-y-1">
                    {section?.items?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className={`
                          flex items-center justify-center w-full p-2 rounded-lg transition-all duration-200
                          ${isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-text-secondary hover:text-foreground hover:bg-muted'
                          }
                        `}
                        title={`${section?.label}: ${item?.label}`}
                      >
                        <Icon name={item?.icon} size={16} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="var(--color-text-secondary)" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-text-secondary">System Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminNavigationSidebar;