import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 4, steps }) => {
  const defaultSteps = [
    { id: 1, label: 'Upload Selfie', icon: 'Upload' },
    { id: 2, label: 'Choose Outfit', icon: 'Shirt' },
    { id: 3, label: 'Select Background', icon: 'Image' },
    { id: 4, label: 'Review & Generate', icon: 'Sparkles' }
  ];

  const stepData = steps || defaultSteps;

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success';
      case 'active':
        return 'text-primary bg-primary';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {stepData?.map((step, index) => (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                    ${getStepColor(getStepStatus(step?.id))}
                  `}
                >
                  {getStepStatus(step?.id) === 'completed' ? (
                    <Icon name="Check" size={20} color="white" />
                  ) : (
                    <Icon 
                      name={step?.icon} 
                      size={20} 
                      color={getStepStatus(step?.id) === 'active' ? 'white' : 'currentColor'} 
                    />
                  )}
                </div>
                <div className="text-center">
                  <p className={`
                    text-sm font-medium
                    ${getStepStatus(step?.id) === 'active' ?'text-primary' 
                      : getStepStatus(step?.id) === 'completed' ?'text-success' :'text-text-secondary'
                    }
                  `}>
                    {step?.label}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < stepData?.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`
                    h-0.5 transition-all duration-200
                    ${step?.id < currentStep ? 'bg-success' : 'bg-border'}
                  `} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Step {currentStep} of {totalSteps}
          </h3>
          <span className="text-sm text-text-secondary">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Current Step Info */}
        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${getStepColor(getStepStatus(currentStep))}
          `}>
            <Icon 
              name={stepData?.[currentStep - 1]?.icon || 'Circle'} 
              size={16} 
              color="white"
            />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {stepData?.[currentStep - 1]?.label}
            </p>
            <p className="text-sm text-text-secondary">
              Complete this step to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;