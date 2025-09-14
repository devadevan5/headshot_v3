import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SecuritySection = ({ onSecurityUpdate }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ipAddress: '192.168.1.1',
      lastActive: '2025-09-14T07:45:00Z',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      ipAddress: '192.168.1.2',
      lastActive: '2025-09-13T22:30:00Z',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Brooklyn, NY',
      ipAddress: '192.168.1.3',
      lastActive: '2025-09-12T14:15:00Z',
      current: false
    }
  ];

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  const handleToggle2FA = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTwoFactorEnabled(!twoFactorEnabled);
      
      if (onSecurityUpdate) {
        onSecurityUpdate({ twoFactorEnabled: !twoFactorEnabled });
      }
    } catch (error) {
      console.error('2FA toggle failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminateSession = async (sessionId) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`Terminating session ${sessionId}`);
    } catch (error) {
      console.error('Session termination failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Account deletion initiated');
    } catch (error) {
      console.error('Account deletion failed:', error);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
        <p className="text-sm text-text-secondary mt-1">
          Manage your account security and active sessions
        </p>
      </div>
      <div className="space-y-8">
        {/* Two-Factor Authentication */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">Two-Factor Authentication</h3>
              <p className="text-sm text-text-secondary mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 ${twoFactorEnabled ? 'text-success' : 'text-text-secondary'}`}>
                <Icon name={twoFactorEnabled ? 'Shield' : 'ShieldOff'} size={16} />
                <span className="text-sm font-medium">
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <Button
                variant={twoFactorEnabled ? 'destructive' : 'default'}
                size="sm"
                onClick={handleToggle2FA}
                loading={isLoading}
                iconName={twoFactorEnabled ? 'ShieldOff' : 'Shield'}
                iconPosition="left"
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
              </Button>
            </div>
          </div>

          {twoFactorEnabled && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                <div>
                  <p className="font-medium text-success">Two-Factor Authentication is Active</p>
                  <p className="text-sm text-success/80 mt-1">
                    Your account is protected with an additional security layer. You'll need your authenticator app to sign in.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">Active Sessions</h3>
              <p className="text-sm text-text-secondary mt-1">
                Manage devices that are currently signed in to your account
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
            >
              Refresh
            </Button>
          </div>

          <div className="space-y-3">
            {activeSessions?.map((session) => (
              <div
                key={session?.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon 
                      name={session?.device?.includes('iPhone') ? 'Smartphone' : 
                           session?.device?.includes('Android') ? 'Smartphone' : 'Monitor'} 
                      size={20} 
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground">{session?.device}</p>
                      {session?.current && (
                        <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{session?.location}</p>
                    <p className="text-xs text-text-secondary">
                      {session?.ipAddress} • {formatLastActive(session?.lastActive)}
                    </p>
                  </div>
                </div>
                
                {!session?.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTerminateSession(session?.id)}
                    disabled={isLoading}
                    iconName="LogOut"
                    iconPosition="left"
                  >
                    Terminate
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-border pt-8">
          <div className="bg-error/5 border border-error/20 rounded-lg p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-error">Danger Zone</h3>
                <p className="text-sm text-error/80 mt-1">
                  Irreversible actions that will permanently affect your account
                </p>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Account
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-background rounded-lg p-4 border border-error/30">
                  <h4 className="font-medium text-foreground mb-2">Confirm Account Deletion</h4>
                  <p className="text-sm text-text-secondary mb-4">
                    This action cannot be undone. This will permanently delete your account, 
                    all your generated headshots, and remove all associated data.
                  </p>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Type <span className="font-mono bg-muted px-1 rounded">DELETE</span> to confirm:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Type DELETE to confirm"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE' || isLoading}
                    loading={isLoading}
                    iconName="Trash2"
                    iconPosition="left"
                  >
                    Delete Account Permanently
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;