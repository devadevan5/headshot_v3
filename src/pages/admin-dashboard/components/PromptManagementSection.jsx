import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Image from '../../../components/AppImage';

/**
 * A component that provides a UI for managing the global prompt template used for generating headshots.
 * It includes features for editing, testing, and viewing the version history of the prompt.
 *
 * @returns {JSX.Element} The rendered prompt management section.
 */
const PromptManagementSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(`Create a professional headshot with the following specifications:
- High-quality, studio-lighting effect
- Sharp focus on the subject's face
- Professional background that complements the outfit
- Natural skin tone and facial features
- Appropriate shadows and highlights
- Commercial photography style
- 4K resolution output

Please ensure the generated image maintains professional standards suitable for business profiles, LinkedIn, and corporate use.`);

  const [testImage, setTestImage] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [isTestingPrompt, setIsTestingPrompt] = useState(false);

  const promptVersions = [
    {
      id: 1,
      version: "v2.1",
      date: "2025-01-14",
      author: "Admin User",
      status: "current",
      description: "Enhanced lighting and resolution specifications"
    },
    {
      id: 2,
      version: "v2.0",
      date: "2025-01-10",
      author: "Admin User",
      status: "archived",
      description: "Added commercial photography style requirements"
    },
    {
      id: 3,
      version: "v1.9",
      date: "2025-01-05",
      author: "System",
      status: "archived",
      description: "Initial professional headshot template"
    }
  ];

  /**
   * Saves the current prompt.
   */
  const handleSavePrompt = () => {
    console.log('Saving prompt:', currentPrompt);
    setIsEditing(false);
  };

  /**
   * Tests the current prompt with a test image.
   */
  const handleTestPrompt = async () => {
    if (!testImage) {
      alert('Please upload a test image first');
      return;
    }

    setIsTestingPrompt(true);

    // Simulate API call to test prompt
    setTimeout(() => {
      setTestResults({
        success: true,
        generatedImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        processingTime: "3.2s",
        quality: "High",
        feedback: "Generated image meets professional standards with good lighting and composition."
      });
      setIsTestingPrompt(false);
    }, 3000);
  };

  /**
   * Handles the upload of a test image.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTestImage(e?.target?.result);
        setTestResults(null);
      };
      reader?.readAsDataURL(file);
    }
  };

  /**
   * Approves the current prompt and deploys it to production.
   */
  const handleApprovePrompt = () => {
    console.log('Approving prompt version');
    alert('Prompt approved and deployed to production!');
  };

  return (
    <div className="space-y-6">
      {/* Current Prompt Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Global Prompt Template</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Version 2.1 • Current</span>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              iconName={isEditing ? "Save" : "Edit"}
              iconPosition="left"
              onClick={isEditing ? handleSavePrompt : () => setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : 'Edit Prompt'}
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e?.target?.value)}
              className="w-full h-48 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your prompt template..."
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                {currentPrompt?.length} characters
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentPrompt(currentPrompt); // Reset to original
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSavePrompt}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-4">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {currentPrompt}
            </pre>
          </div>
        )}
      </div>
      {/* Test Prompt Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Test Prompt</h3>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Test Image */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Upload Test Image</h4>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {testImage ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={testImage}
                      alt="Test upload"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => document.getElementById('test-image-upload')?.click()}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Icon name="Upload" size={48} className="mx-auto text-text-secondary" />
                  <div>
                    <p className="text-foreground font-medium">Upload a test image</p>
                    <p className="text-sm text-text-secondary">JPG, PNG up to 10MB</p>
                  </div>
                  <Button
                    variant="outline"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => document.getElementById('test-image-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}

              <input
                id="test-image-upload"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <Button
              variant="default"
              fullWidth
              loading={isTestingPrompt}
              disabled={!testImage}
              iconName="Play"
              iconPosition="left"
              onClick={handleTestPrompt}
            >
              {isTestingPrompt ? 'Testing Prompt...' : 'Test Prompt'}
            </Button>
          </div>

          {/* Test Results */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Test Results</h4>

            {testResults ? (
              <div className="space-y-4">
                <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={testResults?.generatedImage}
                    alt="Generated test result"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Processing Time:</span>
                    <span className="font-medium text-foreground">{testResults?.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Quality:</span>
                    <span className="font-medium text-success">{testResults?.quality}</span>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-foreground">{testResults?.feedback}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    iconName="Check"
                    iconPosition="left"
                    onClick={handleApprovePrompt}
                  >
                    Approve & Deploy
                  </Button>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => setTestResults(null)}
                  >
                    Test Again
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-64 border border-border rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="ImageOff" size={48} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-text-secondary">No test results yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Version History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Version History</h3>

        <div className="space-y-3">
          {promptVersions?.map((version) => (
            <div
              key={version?.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  version?.status === 'current' ? 'bg-success' : 'bg-text-secondary'
                }`} />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{version?.version}</span>
                    {version?.status === 'current' && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{version?.description}</p>
                  <p className="text-xs text-text-secondary">
                    {version?.date} • by {version?.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => console.log(`View version ${version?.version}`)}
                />
                {version?.status !== 'current' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => console.log(`Restore version ${version?.version}`)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptManagementSection;