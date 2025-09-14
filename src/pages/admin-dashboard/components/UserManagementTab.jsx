import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

/**
 * A component that provides a UI for managing users.
 * It includes features for searching, filtering, and performing bulk actions on users.
 *
 * @returns {JSX.Element} The rendered user management tab.
 */
const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubscription, setFilterSubscription] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingCredit, setEditingCredit] = useState(null);
  const [creditValue, setCreditValue] = useState('');

  const userData = [
    {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      credits: 45,
      subscription: "Pro",
      status: "active",
      joinDate: "2025-01-10",
      lastActive: "2025-01-14",
      totalGenerations: 23
    },
    {
      id: 2,
      email: "sarah.wilson@company.com",
      name: "Sarah Wilson",
      credits: 0,
      subscription: "Starter",
      status: "active",
      joinDate: "2025-01-08",
      lastActive: "2025-01-13",
      totalGenerations: 12
    },
    {
      id: 3,
      email: "mike.johnson@startup.io",
      name: "Mike Johnson",
      credits: 120,
      subscription: "Premium",
      status: "active",
      joinDate: "2025-01-05",
      lastActive: "2025-01-14",
      totalGenerations: 67
    },
    {
      id: 4,
      email: "emma.brown@freelance.com",
      name: "Emma Brown",
      credits: 15,
      subscription: "Free",
      status: "suspended",
      joinDate: "2025-01-12",
      lastActive: "2025-01-12",
      totalGenerations: 3
    }
  ];

  const subscriptionOptions = [
    { value: 'all', label: 'All Subscriptions' },
    { value: 'free', label: 'Free' },
    { value: 'starter', label: 'Starter' },
    { value: 'pro', label: 'Pro' },
    { value: 'premium', label: 'Premium' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'banned', label: 'Banned' }
  ];

  /**
   * Returns the color class for a given status.
   * @param {string} status - The status to get the color for.
   * @returns {string} The color class.
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'suspended':
        return 'text-warning bg-warning/10';
      case 'banned':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  /**
   * Returns the color class for a given subscription plan.
   * @param {string} subscription - The subscription plan to get the color for.
   * @returns {string} The color class.
   */
  const getSubscriptionColor = (subscription) => {
    switch (subscription?.toLowerCase()) {
      case 'premium':
        return 'text-accent bg-accent/10';
      case 'pro':
        return 'text-primary bg-primary/10';
      case 'starter':
        return 'text-success bg-success/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  /**
   * Toggles the selection of a user.
   * @param {number} userId - The ID of the user to select or deselect.
   */
  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  /**
   * Selects or deselects all users.
   */
  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  /**
   * Enters edit mode for a user's credits.
   * @param {number} userId - The ID of the user to edit.
   * @param {number} currentCredits - The user's current credits.
   */
  const handleEditCredit = (userId, currentCredits) => {
    setEditingCredit(userId);
    setCreditValue(currentCredits?.toString());
  };

  /**
   * Saves the updated credit value for a user.
   * @param {number} userId - The ID of the user to save.
   */
  const handleSaveCredit = (userId) => {
    console.log(`Updating credits for user ${userId} to ${creditValue}`);
    setEditingCredit(null);
    setCreditValue('');
  };

  /**
   * Performs an action on a user.
   * @param {number} userId - The ID of the user to perform the action on.
   * @param {string} action - The action to perform.
   */
  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
  };

  /**
   * Performs a bulk action on the selected users.
   * @param {string} action - The action to perform.
   */
  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const filteredUsers = userData?.filter(user => {
    const matchesSearch = user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesSubscription = filterSubscription === 'all' ||
                               user?.subscription?.toLowerCase() === filterSubscription;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;

    return matchesSearch && matchesSubscription && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
            type="search"
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="sm:w-80"
          />
          <Select
            options={subscriptionOptions}
            value={filterSubscription}
            onChange={setFilterSubscription}
            placeholder="Filter by subscription"
            className="sm:w-48"
          />
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by status"
            className="sm:w-48"
          />
        </div>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={() => console.log('Export user data')}
        >
          Export Data
        </Button>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              onClick={() => handleBulkAction('email')}
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="UserX"
              iconPosition="left"
              onClick={() => handleBulkAction('suspend')}
            >
              Suspend
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Ban"
              iconPosition="left"
              onClick={() => handleBulkAction('ban')}
            >
              Ban
            </Button>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              User Management ({filteredUsers?.length} users)
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="divide-y divide-border">
          {filteredUsers?.map((user) => (
            <div key={user?.id} className="px-6 py-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedUsers?.includes(user?.id)}
                  onChange={() => handleSelectUser(user?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{user?.name}</h3>
                      <p className="text-sm text-text-secondary">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-text-secondary">Credits:</span>
                      <div className="flex items-center space-x-2 mt-1">
                        {editingCredit === user?.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              value={creditValue}
                              onChange={(e) => setCreditValue(e?.target?.value)}
                              className="w-16 px-2 py-1 text-xs border border-border rounded"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Check"
                              onClick={() => handleSaveCredit(user?.id)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="X"
                              onClick={() => setEditingCredit(null)}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span className={`font-medium ${user?.credits === 0 ? 'text-error' : 'text-foreground'}`}>
                              {user?.credits}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Edit"
                              onClick={() => handleEditCredit(user?.id, user?.credits)}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-text-secondary">Subscription:</span>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(user?.subscription)}`}>
                          {user?.subscription}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-text-secondary">Status:</span>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user?.status)}`}>
                          {user?.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-text-secondary">Generations:</span>
                      <div className="mt-1">
                        <span className="font-medium text-foreground">{user?.totalGenerations}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                    <span>Joined {user?.joinDate}</span>
                    <span>•</span>
                    <span>Last active {user?.lastActive}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Mail"
                    onClick={() => handleUserAction(user?.id, 'email')}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
                    onClick={() => handleUserAction(user?.id, user?.status === 'active' ? 'suspend' : 'activate')}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreVertical"
                    onClick={() => console.log(`More options for user ${user?.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers?.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-text-secondary">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementTab;