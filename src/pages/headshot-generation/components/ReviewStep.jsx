import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewStep = ({ 
  uploadedImage, 
  selectedOutfit, 
  selectedBackground, 
  userCredits = 0,
  onGenerate,
  isGenerating = false 
}) => {
  const [showCreditWarning, setShowCreditWarning] = useState(false);
  const creditCost = 1;

  const handleGenerate = () => {
    if (userCredits < creditCost) {
      setShowCreditWarning(true);
      return;
    }
    onGenerate();
  };

  const canGenerate = uploadedImage && selectedOutfit && selectedBackground;
  const hasEnoughCredits = userCredits >= creditCost;

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Review Your Selections
        </h2>
        <p className="text-text-secondary">
          Check your choices before generating your professional headshot
        </p>
      </div>
      {/* Selection Review Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Selfie Review */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Your Selfie</h3>
          </div>
          {uploadedImage ? (
            <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <Image
                src={uploadedImage?.preview}
                alt="Your selfie"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                ✓ Ready
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="Upload" size={24} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No selfie uploaded</p>
              </div>
            </div>
          )}
        </div>

        {/* Outfit Review */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Shirt" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Outfit</h3>
          </div>
          {selectedOutfit ? (
            <div className="space-y-2">
              <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <Image
                  src={selectedOutfit?.image}
                  alt={selectedOutfit?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Selected
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground text-sm">{selectedOutfit?.name}</p>
                <p className="text-xs text-text-secondary">{selectedOutfit?.description}</p>
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="Shirt" size={24} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No outfit selected</p>
              </div>
            </div>
          )}
        </div>

        {/* Background Review */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Image" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Background</h3>
          </div>
          {selectedBackground ? (
            <div className="space-y-2">
              <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <Image
                  src={selectedBackground?.image}
                  alt={selectedBackground?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Selected
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground text-sm">{selectedBackground?.name}</p>
                <p className="text-xs text-text-secondary">{selectedBackground?.description}</p>
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="Image" size={24} className="text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No background selected</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Credit Information */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Coins" size={20} className="text-accent" />
            <div>
              <p className="font-medium text-foreground">Generation Cost</p>
              <p className="text-sm text-text-secondary">
                {creditCost} credit will be deducted from your balance
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-lg font-semibold text-foreground">
              {userCredits} credits
            </p>
            <p className="text-sm text-text-secondary">Available</p>
          </div>
        </div>
      </div>
      {/* Credit Warning */}
      {showCreditWarning && !hasEnoughCredits && (
        <div className="bg-error/10 border border-error/20 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-error mb-1">Insufficient Credits</h4>
              <p className="text-sm text-error/80 mb-3">
                You need {creditCost} credit to generate a headshot, but you only have {userCredits} credits remaining.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreditWarning(false)}
                iconName="CreditCard"
                iconPosition="left"
              >
                Upgrade Plan
              </Button>
            </div>
            <button
              onClick={() => setShowCreditWarning(false)}
              className="p-1 rounded hover:bg-error/10 transition-colors duration-200"
            >
              <Icon name="X" size={16} className="text-error" />
            </button>
          </div>
        </div>
      )}
      {/* Generation Button */}
      <div className="text-center">
        <Button
          variant="default"
          size="lg"
          onClick={handleGenerate}
          disabled={!canGenerate || !hasEnoughCredits || isGenerating}
          loading={isGenerating}
          iconName="Sparkles"
          iconPosition="left"
          className="px-8"
        >
          {isGenerating ? 'Generating Your Headshot...' : 'Generate Professional Headshot'}
        </Button>
        
        {!canGenerate && (
          <p className="text-sm text-text-secondary mt-2">
            Please complete all steps before generating
          </p>
        )}
      </div>
      {/* Processing Info */}
      {isGenerating && (
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-primary">Processing Your Headshot</p>
              <p className="text-sm text-primary/80">
                This usually takes 30-60 seconds. Please don't close this page.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;