import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * A component that provides information about installing the application as a Progressive Web App (PWA).
 * It detects the user's device and shows the appropriate installation instructions.
 *
 * @param {object} props - The properties for the component.
 * @param {function} props.onInstallPWA - A function to be called when the PWA is installed.
 * @returns {JSX.Element} The rendered PWA section.
 */
const PWASection = ({ onInstallPWA }) => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    /**
     * Checks if the PWA is already installed.
     */
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)')?.matches) {
        setIsInstalled(true);
      }
    };

    /**
     * Detects the type of device the user is on.
     */
    const detectDevice = () => {
      const userAgent = navigator.userAgent?.toLowerCase();
      if (/iphone|ipad|ipod/?.test(userAgent)) {
        setDeviceType('ios');
      } else if (/android/?.test(userAgent)) {
        setDeviceType('android');
      } else {
        setDeviceType('desktop');
      }
    };

    /**
     * Handles the `beforeinstallprompt` event.
     * @param {Event} e - The `beforeinstallprompt` event.
     */
    const handleBeforeInstallPrompt = (e) => {
      e?.preventDefault();
      setInstallPrompt(e);
    };

    checkInstallation();
    detectDevice();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  /**
   * Handles the installation of the PWA.
   */
  const handleInstall = async () => {
    if (!installPrompt) return;

    setIsInstalling(true);
    try {
      const result = await installPrompt?.prompt();
      console.log('Install prompt result:', result);

      if (result?.outcome === 'accepted') {
        setIsInstalled(true);
        if (onInstallPWA) {
          onInstallPWA();
        }
      }
      setInstallPrompt(null);
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  /**
   * Returns the installation instructions for the user's device.
   * @returns {{title: string, steps: string[], icon: string}} The installation instructions.
   */
  const getDeviceInstructions = () => {
    switch (deviceType) {
      case 'ios':
        return {
          title: 'Install on iOS',
          steps: [
            'Tap the Share button in Safari',
            'Scroll down and tap "Add to Home Screen"',
            'Tap "Add" to install the app'
          ],
          icon: 'Smartphone'
        };
      case 'android':
        return {
          title: 'Install on Android',
          steps: [
            'Tap the menu button (⋮) in Chrome',
            'Select "Add to Home screen"',
            'Tap "Add" to install the app'
          ],
          icon: 'Smartphone'
        };
      default:
        return {
          title: 'Install on Desktop',
          steps: [
            'Click the install button in your browser\'s address bar',
            'Or use the install button below',
            'Follow the browser prompts to complete installation'
          ],
          icon: 'Monitor'
        };
    }
  };

  const deviceInstructions = getDeviceInstructions();

  const features = [
    {
      icon: 'Zap',
      title: 'Faster Loading',
      description: 'Instant access with offline capabilities'
    },
    {
      icon: 'Bell',
      title: 'Push Notifications',
      description: 'Get notified when your headshots are ready'
    },
    {
      icon: 'Smartphone',
      title: 'Native Experience',
      description: 'App-like interface on your device'
    },
    {
      icon: 'Download',
      title: 'Offline Access',
      description: 'View your gallery even without internet'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">App Installation</h2>
        <p className="text-sm text-text-secondary mt-1">
          Install Headshot.com as a native app for the best experience
        </p>
      </div>
      {isInstalled ? (
        <div className="bg-success/10 border border-success/20 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-success">App Installed Successfully!</h3>
              <p className="text-sm text-success/80">
                Headshot.com is now installed on your device
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              className="border-success text-success hover:bg-success/10"
            >
              Open App
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              className="text-success hover:bg-success/10"
            >
              App Settings
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Installation Status */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={deviceInstructions?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Installation Status</p>
                <p className="text-sm text-text-secondary">
                  {installPrompt ? 'Ready to install' : 'Installation not available'}
                </p>
              </div>
            </div>

            {installPrompt && (
              <Button
                variant="default"
                onClick={handleInstall}
                loading={isInstalling}
                iconName="Download"
                iconPosition="left"
              >
                Install App
              </Button>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">App Benefits</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature?.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{feature?.title}</p>
                    <p className="text-sm text-text-secondary">{feature?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-medium text-foreground mb-4">
              {deviceInstructions?.title}
            </h3>
            <div className="space-y-3">
              {deviceInstructions?.steps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Compatibility */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Browser Compatibility</p>
                <p className="text-sm text-text-secondary mt-1">
                  App installation is supported on Chrome, Edge, Safari, and other modern browsers.
                  If you don't see the install option, try updating your browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWASection;