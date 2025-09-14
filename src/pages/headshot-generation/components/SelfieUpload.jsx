import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SelfieUpload = ({ onUpload, uploadedImage, onRemove, isProcessing = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDetectingFace, setIsDetectingFace] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes?.includes(file?.type)) {
      return 'Please upload a JPG or PNG image file.';
    }

    if (file?.size > maxSize) {
      return 'File size must be less than 10MB.';
    }

    return null;
  };

  const simulateFaceDetection = async (file) => {
    setIsDetectingFace(true);
    // Simulate face detection processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDetectingFace(false);
    return true; // Assume face detected successfully
  };

  const handleFileSelect = async (file) => {
    setUploadError('');
    
    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    try {
      const faceDetected = await simulateFaceDetection(file);
      
      if (faceDetected) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onUpload({
            file,
            preview: e?.target?.result,
            name: file?.name,
            size: file?.size
          });
        };
        reader?.readAsDataURL(file);
      } else {
        setUploadError('No face detected in the image. Please upload a clear selfie.');
      }
    } catch (error) {
      setUploadError('Failed to process image. Please try again.');
    }
  };

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      handleFileSelect(files?.[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      handleFileSelect(files?.[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const handleRemoveImage = () => {
    setUploadError('');
    onRemove();
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  if (uploadedImage) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
            <Image
              src={uploadedImage?.preview}
              alt="Uploaded selfie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRemoveImage}
                  iconName="Trash2"
                  iconPosition="left"
                  disabled={isProcessing}
                >
                  Remove
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBrowseClick}
                  iconName="Upload"
                  iconPosition="left"
                  disabled={isProcessing}
                >
                  Replace
                </Button>
              </div>
            </div>
          </div>
          
          {/* Face detection indicator */}
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Check" size={12} />
            <span>Face Detected</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            File: {uploadedImage?.name} ({(uploadedImage?.size / 1024 / 1024)?.toFixed(2)} MB)
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }
          ${isDetectingFace ? 'pointer-events-none' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleBrowseClick}
      >
        {isDetectingFace ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Detecting Face...
              </h3>
              <p className="text-text-secondary">
                Please wait while we analyze your image
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload Your Selfie
              </h3>
              <p className="text-text-secondary mb-4">
                Drag and drop your photo here, or click to browse
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-text-secondary">
                <span className="bg-muted px-2 py-1 rounded">JPG</span>
                <span className="bg-muted px-2 py-1 rounded">PNG</span>
                <span className="bg-muted px-2 py-1 rounded">Max 10MB</span>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {uploadError && (
        <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-lg">
          <Icon name="AlertCircle" size={16} className="text-error" />
          <p className="text-sm text-error">{uploadError}</p>
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span>Tips for Best Results</span>
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Use good lighting with your face clearly visible</li>
          <li>• Face the camera directly with a neutral expression</li>
          <li>• Avoid sunglasses, hats, or face coverings</li>
          <li>• Ensure the image is sharp and not blurry</li>
        </ul>
      </div>
    </div>
  );
};

export default SelfieUpload;