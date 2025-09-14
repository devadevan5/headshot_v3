import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const CreateHeadshotCard = ({ credits = 0, disabled = false }) => {
  const navigate = useNavigate();

  const handleCreateHeadshot = () => {
    if (credits > 0 && !disabled) {
      navigate('/headshot-generation');
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-xl p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Visual Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Camera" size={48} color="white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-md">
              <Icon name="Sparkles" size={16} color="white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Create Your Professional Headshot
          </h2>
          <p className="text-text-secondary mb-6 max-w-md">
            Upload a selfie and let our AI generate stunning professional headshots in minutes. 
            Perfect for LinkedIn, resumes, and business profiles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleCreateHeadshot}
              disabled={credits === 0 || disabled}
              iconName="Camera"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              {credits === 0 ? 'No Credits Available' : 'Start Creating'}
            </Button>

            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} />
              <span>Takes 2-3 minutes</span>
            </div>
          </div>

          {credits === 0 && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">
                  You need credits to generate headshots
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary">AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">High Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHeadshotCard;