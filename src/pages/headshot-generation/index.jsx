import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import SelfieUpload from './components/SelfieUpload';
import OutfitSelection from './components/OutfitSelection';
import BackgroundSelection from './components/BackgroundSelection';
import ProgressIndicator from './components/ProgressIndicator';
import ReviewStep from './components/ReviewStep';
import GenerationResult from './components/GenerationResult';
import PaywallModal from '../../components/ui/PaywallModal';

const HeadshotGeneration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // User data (mock)
  const [userCredits, setUserCredits] = useState(5);
  const [userData] = useState({
    name: "John Doe",
    email: "john@example.com"
  });

  // Generation data
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const steps = [
    { id: 1, label: 'Upload Selfie', icon: 'Upload' },
    { id: 2, label: 'Choose Outfit', icon: 'Shirt' },
    { id: 3, label: 'Select Background', icon: 'Image' },
    { id: 4, label: 'Review & Generate', icon: 'Sparkles' }
  ];

  // Check if user can proceed to next step
  const canProceedToStep = (step) => {
    switch (step) {
      case 2:
        return uploadedImage !== null;
      case 3:
        return uploadedImage !== null && selectedOutfit !== null;
      case 4:
        return uploadedImage !== null && selectedOutfit !== null && selectedBackground !== null;
      default:
        return true;
    }
  };

  // Handle selfie upload
  const handleSelfieUpload = (imageData) => {
    setUploadedImage(imageData);
    // Auto-advance to next step after successful upload
    setTimeout(() => {
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }, 500);
  };

  // Handle selfie removal
  const handleSelfieRemove = () => {
    setUploadedImage(null);
    if (currentStep > 1) {
      setCurrentStep(1);
    }
  };

  // Handle outfit selection
  const handleOutfitSelect = (outfit) => {
    setSelectedOutfit(outfit);
    // Auto-advance to next step after selection
    setTimeout(() => {
      if (currentStep === 2) {
        setCurrentStep(3);
      }
    }, 300);
  };

  // Handle background selection
  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background);
    // Auto-advance to next step after selection
    setTimeout(() => {
      if (currentStep === 3) {
        setCurrentStep(4);
      }
    }, 300);
  };

  // Handle generation
  const handleGenerate = async () => {
    if (userCredits < 1) {
      setShowPaywall(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call to Google Gemini 2.5 Flash Image API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated image
      const mockGeneratedImage = {
        id: `headshot-${Date.now()}`,
        url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
        createdAt: new Date(),
        resolution: '1024x1280',
        format: 'JPEG'
      };

      setGeneratedImage(mockGeneratedImage);
      setUserCredits(prev => prev - 1);
      setGenerationComplete(true);
    } catch (error) {
      console.error('Generation failed:', error);
      // Handle error - could show error modal
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle download
  const handleDownload = async (image) => {
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create download link
      const link = document.createElement('a');
      link.href = image?.url;
      link.download = `professional-headshot-${Date.now()}.jpg`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle feedback submission
  const handleFeedback = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    // In real app, send to analytics/feedback API
  };

  // Handle generate another
  const handleGenerateAnother = () => {
    setGenerationComplete(false);
    setGeneratedImage(null);
    setCurrentStep(1);
    setUploadedImage(null);
    setSelectedOutfit(null);
    setSelectedBackground(null);
  };

  // Handle step navigation
  const handleStepNavigation = (step) => {
    if (step < currentStep || canProceedToStep(step)) {
      setCurrentStep(step);
    }
  };

  // Handle paywall upgrade
  const handlePaywallUpgrade = async (planId) => {
    console.log('Upgrading to plan:', planId);
    // Simulate upgrade process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock credit addition based on plan
    const creditsByPlan = {
      starter: 100,
      pro: 250,
      business: 500
    };
    
    setUserCredits(prev => prev + (creditsByPlan?.[planId] || 100));
    setShowPaywall(false);
  };

  // Auto-save progress to localStorage
  useEffect(() => {
    const progressData = {
      currentStep,
      uploadedImage,
      selectedOutfit,
      selectedBackground
    };
    localStorage.setItem('headshotProgress', JSON.stringify(progressData));
  }, [currentStep, uploadedImage, selectedOutfit, selectedBackground]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('headshotProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress?.uploadedImage) setUploadedImage(progress?.uploadedImage);
        if (progress?.selectedOutfit) setSelectedOutfit(progress?.selectedOutfit);
        if (progress?.selectedBackground) setSelectedBackground(progress?.selectedBackground);
        if (progress?.currentStep) setCurrentStep(progress?.currentStep);
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
  }, []);

  const renderStepContent = () => {
    if (generationComplete && generatedImage) {
      return (
        <GenerationResult
          generatedImage={generatedImage}
          onDownload={handleDownload}
          onFeedback={handleFeedback}
          onGenerateAnother={handleGenerateAnother}
          isDownloading={isDownloading}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <SelfieUpload
            onUpload={handleSelfieUpload}
            uploadedImage={uploadedImage}
            onRemove={handleSelfieRemove}
            isProcessing={isGenerating}
          />
        );
      case 2:
        return (
          <OutfitSelection
            selectedOutfit={selectedOutfit}
            onOutfitSelect={handleOutfitSelect}
            isProcessing={isGenerating}
          />
        );
      case 3:
        return (
          <BackgroundSelection
            selectedBackground={selectedBackground}
            onBackgroundSelect={handleBackgroundSelect}
            isProcessing={isGenerating}
          />
        );
      case 4:
        return (
          <ReviewStep
            uploadedImage={uploadedImage}
            selectedOutfit={selectedOutfit}
            selectedBackground={selectedBackground}
            userCredits={userCredits}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={true}
        userCredits={userCredits}
        userName={userData?.name}
        userEmail={userData?.email}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Create Your Professional Headshot
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Upload your selfie, choose your style, and let AI create a stunning professional headshot in minutes
          </p>
        </div>

        {/* Progress Indicator */}
        {!generationComplete && (
          <div className="mb-8">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={4}
              steps={steps}
            />
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation Controls */}
        {!generationComplete && !isGenerating && (
          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => handleStepNavigation(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {steps?.map((step) => (
                <button
                  key={step?.id}
                  onClick={() => handleStepNavigation(step?.id)}
                  disabled={!canProceedToStep(step?.id)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-200
                    ${step?.id === currentStep
                      ? 'bg-primary'
                      : step?.id < currentStep
                        ? 'bg-success'
                        : canProceedToStep(step?.id)
                          ? 'bg-muted hover:bg-primary/50' :'bg-muted opacity-50 cursor-not-allowed'
                    }
                  `}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handleStepNavigation(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4 || !canProceedToStep(currentStep + 1)}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        )}

        {/* Back to Dashboard */}
        {generationComplete && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>
        )}
      </main>
      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={handlePaywallUpgrade}
        currentCredits={userCredits}
        trigger="zero_credits"
      />
    </div>
  );
};

export default HeadshotGeneration;