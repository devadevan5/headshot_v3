import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

/**
 * A component that displays the generated headshot and provides options for downloading, rating, and generating another headshot.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.generatedImage - The generated headshot image.
 * @param {function} props.onDownload - A function to be called when the user clicks the download button.
 * @param {function} props.onFeedback - A function to be called when the user submits feedback.
 * @param {function} props.onGenerateAnother - A function to be called when the user clicks the "Generate Another" button.
 * @param {boolean} [props.isDownloading=false] - Whether the image is currently being downloaded.
 * @returns {JSX.Element} The rendered generation result component.
 */
const GenerationResult = ({
  generatedImage,
  onDownload,
  onFeedback,
  onGenerateAnother,
  isDownloading = false
}) => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  /**
   * Handles the selection of a rating.
   * @param {number} rating - The selected rating.
   */
  const handleRatingSelect = (rating) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  /**
   * Handles changes to the feedback comment.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event.
   */
  const handleCommentChange = (e) => {
    setFeedback(prev => ({ ...prev, comment: e?.target?.value }));
  };

  /**
   * Handles the submission of feedback.
   */
  const handleSubmitFeedback = () => {
    if (feedback?.rating > 0) {
      onFeedback(feedback);
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowFeedbackForm(false);
        setFeedbackSubmitted(false);
      }, 2000);
    }
  };

  /**
   * Handles the download of the generated headshot.
   */
  const handleDownload = () => {
    if (onDownload) {
      onDownload(generatedImage);
    } else {
      // Default download behavior
      const link = document.createElement('a');
      link.href = generatedImage?.url;
      link.download = `headshot-${Date.now()}.jpg`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Your Headshot is Ready!
        </h2>
        <p className="text-text-secondary">
          Your professional headshot has been generated successfully
        </p>
      </div>
      {/* Generated Image Display */}
      <div className="max-w-md mx-auto">
        <div className="relative bg-muted rounded-lg overflow-hidden shadow-lg">
          <Image
            src={generatedImage?.url || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600'}
            alt="Generated professional headshot"
            className="w-full aspect-[3/4] object-cover"
          />

          {/* Quality Badge */}
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            High Resolution
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={handleDownload}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
        >
          {isDownloading ? 'Downloading...' : 'Download Headshot'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowFeedbackForm(true)}
          iconName="Star"
          iconPosition="left"
        >
          Rate This Result
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={onGenerateAnother}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Generate Another
        </Button>
      </div>
      {/* Image Details */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>Image Details</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary">Resolution</p>
            <p className="font-medium text-foreground">1024 x 1280 pixels</p>
          </div>
          <div>
            <p className="text-text-secondary">Format</p>
            <p className="font-medium text-foreground">JPEG</p>
          </div>
          <div>
            <p className="text-text-secondary">Generated</p>
            <p className="font-medium text-foreground">
              {new Date()?.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div>
            <p className="text-text-secondary">File Size</p>
            <p className="font-medium text-foreground">~2.5 MB</p>
          </div>
        </div>
      </div>
      {/* Storage Notice */}
      <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-warning mb-1">Storage Notice</h4>
            <p className="text-sm text-warning/80">
              Your headshot will be available for download for 7 days. After that, it will be automatically deleted for privacy and security.
            </p>
          </div>
        </div>
      </div>
      {/* Feedback Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFeedbackForm(false)} />

          <div className="relative w-full max-w-md bg-background rounded-lg shadow-lg p-6">
            {feedbackSubmitted ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Thank You!
                </h3>
                <p className="text-text-secondary">
                  Your feedback helps us improve our service
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Rate Your Experience
                  </h3>
                  <button
                    onClick={() => setShowFeedbackForm(false)}
                    className="p-1 rounded hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>

                {/* Star Rating */}
                <div className="mb-4">
                  <p className="text-sm text-text-secondary mb-2">How satisfied are you with the result?</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingSelect(star)}
                        className={`p-1 transition-colors duration-200 ${
                          star <= feedback?.rating ? 'text-accent' : 'text-text-secondary hover:text-accent'
                        }`}
                      >
                        <Icon name="Star" size={24} fill={star <= feedback?.rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    value={feedback?.comment}
                    onChange={handleCommentChange}
                    placeholder="Tell us what you think about the generated headshot..."
                    className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleSubmitFeedback}
                  disabled={feedback?.rating === 0}
                  iconName="Send"
                  iconPosition="left"
                >
                  Submit Feedback
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationResult;