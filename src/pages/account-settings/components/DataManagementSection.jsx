import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * A component that allows users to download their personal data and clear their generation history.
 * It includes modals for confirming these actions.
 *
 * @param {object} props - The properties for the component.
 * @param {function} props.onDataAction - A function to be called when a data action is performed.
 * @returns {JSX.Element} The rendered data management section.
 */
const DataManagementSection = ({ onDataAction }) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const dataCategories = [
    {
      id: 'profile',
      name: 'Profile Information',
      description: 'Your account details, email, and preferences',
      size: '2.3 KB',
      included: true
    },
    {
      id: 'headshots',
      name: 'Generated Headshots',
      description: 'All your AI-generated professional headshots',
      size: '45.7 MB',
      included: true
    },
    {
      id: 'history',
      name: 'Generation History',
      description: 'Records of your headshot generation requests',
      size: '156 KB',
      included: true
    },
    {
      id: 'preferences',
      name: 'App Preferences',
      description: 'Your notification and display settings',
      size: '1.2 KB',
      included: false
    },
    {
      id: 'billing',
      name: 'Billing Information',
      description: 'Subscription and payment history',
      size: '8.4 KB',
      included: false
    }
  ];

  const [selectedCategories, setSelectedCategories] = useState(
    dataCategories?.filter(cat => cat?.included)?.map(cat => cat?.id)
  );

  /**
   * Toggles the selection of a data category for download.
   * @param {string} categoryId - The ID of the category to toggle.
   */
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev?.includes(categoryId)
        ? prev?.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  /**
   * Handles the download of personal data.
   */
  const handleDownloadData = async () => {
    setIsProcessing(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        setDownloadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Mock data download
      const selectedData = dataCategories?.filter(cat =>
        selectedCategories?.includes(cat?.id)
      );

      if (onDataAction) {
        onDataAction('download', selectedData);
      }

      console.log('Data download completed for categories:', selectedCategories);
      setShowDownloadModal(false);
    } catch (error) {
      console.error('Data download failed:', error);
    } finally {
      setIsProcessing(false);
      setDownloadProgress(0);
    }
  };

  /**
   * Handles the clearing of the generation history.
   */
  const handleClearHistory = async () => {
    setIsProcessing(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (onDataAction) {
        onDataAction('clear', null);
      }

      console.log('Generation history cleared');
      setShowClearModal(false);
    } catch (error) {
      console.error('Clear history failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Calculates the total size of the selected data categories.
   * @returns {number} The total size in KB.
   */
  const getTotalSize = () => {
    return dataCategories?.filter(cat => selectedCategories?.includes(cat?.id))?.reduce((total, cat) => {
        const size = parseFloat(cat?.size);
        const unit = cat?.size?.includes('MB') ? 1024 : 1;
        return total + (size * unit);
      }, 0);
  };

  /**
   * Formats a size in KB into a human-readable string.
   * @param {number} sizeInKB - The size in KB.
   * @returns {string} The formatted size.
   */
  const formatSize = (sizeInKB) => {
    if (sizeInKB < 1024) return `${sizeInKB?.toFixed(1)} KB`;
    return `${(sizeInKB / 1024)?.toFixed(1)} MB`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
        <p className="text-sm text-text-secondary mt-1">
          Download your data or clear your generation history
        </p>
      </div>
      <div className="space-y-6">
        {/* Download Personal Data */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">Download Personal Data</h3>
              <p className="text-sm text-text-secondary">
                Export your account data in a portable format
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowDownloadModal(true)}
              iconName="Download"
              iconPosition="left"
            >
              Download Data
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">What's included?</p>
                <p className="text-sm text-text-secondary mt-1">
                  Your profile information, generated headshots, generation history, and app preferences.
                  Data will be provided in JSON format with images in a ZIP archive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Generation History */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">Clear Generation History</h3>
              <p className="text-sm text-text-secondary">
                Remove all records of your headshot generations
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowClearModal(true)}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear History
            </Button>
          </div>

          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Important Note</p>
                <p className="text-sm text-warning/80 mt-1">
                  This will only clear your generation history records. Your actual headshot images
                  will remain available until their automatic deletion after 7 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Usage */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Storage Usage</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Camera" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">Generated Headshots</p>
                  <p className="text-sm text-text-secondary">12 images stored</p>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">45.7 MB</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={18} className="text-accent" />
                <div>
                  <p className="font-medium text-foreground">Generation Records</p>
                  <p className="text-sm text-text-secondary">24 generation requests</p>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">156 KB</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="User" size={18} className="text-success" />
                <div>
                  <p className="font-medium text-foreground">Profile Data</p>
                  <p className="text-sm text-text-secondary">Account information</p>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">2.3 KB</span>
            </div>
          </div>
        </div>
      </div>
      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isProcessing && setShowDownloadModal(false)} />
          <div className="relative w-full max-w-md mx-4 bg-background rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Download Personal Data</h3>
                {!isProcessing && (
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="p-1 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

              {!isProcessing ? (
                <>
                  <p className="text-sm text-text-secondary mb-4">
                    Select the data categories you want to include in your download:
                  </p>

                  <div className="space-y-3 mb-6">
                    {dataCategories?.map((category) => (
                      <div
                        key={category?.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedCategories?.includes(category?.id)}
                            onChange={() => handleCategoryToggle(category?.id)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                          />
                          <div>
                            <p className="font-medium text-foreground">{category?.name}</p>
                            <p className="text-xs text-text-secondary">{category?.description}</p>
                          </div>
                        </div>
                        <span className="text-xs text-text-secondary">{category?.size}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4 p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium text-foreground">Total Size:</span>
                    <span className="font-semibold text-primary">{formatSize(getTotalSize())}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setShowDownloadModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      fullWidth
                      onClick={handleDownloadData}
                      disabled={selectedCategories?.length === 0}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Download" size={24} className="text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Preparing Your Data</h4>
                  <p className="text-sm text-text-secondary mb-4">
                    Please wait while we compile your data...
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-text-secondary">{downloadProgress}% complete</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Clear History Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isProcessing && setShowClearModal(false)} />
          <div className="relative w-full max-w-md mx-4 bg-background rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Clear Generation History</h3>
                {!isProcessing && (
                  <button
                    onClick={() => setShowClearModal(false)}
                    className="p-1 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

              {!isProcessing ? (
                <>
                  <div className="flex items-start space-x-3 mb-4">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">Are you sure?</p>
                      <p className="text-sm text-text-secondary mt-1">
                        This will permanently remove all records of your headshot generations.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setShowClearModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      fullWidth
                      onClick={handleClearHistory}
                      iconName="Trash2"
                      iconPosition="left"
                    >
                      Clear History
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Trash2" size={24} className="text-warning" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Clearing History</h4>
                  <p className="text-sm text-text-secondary">
                    Please wait while we clear your generation history...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagementSection;