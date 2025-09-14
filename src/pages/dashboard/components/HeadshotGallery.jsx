import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeadshotGallery = ({ headshots = [], onDownload, onDelete }) => {
  const [selectedHeadshot, setSelectedHeadshot] = useState(null);

  // Mock headshots data
  const mockHeadshots = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      createdAt: new Date('2025-01-10'),
      outfit: "Professional Suit",
      background: "Office Background",
      rating: null,
      downloads: 3
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      createdAt: new Date('2025-01-08'),
      outfit: "Business Casual",
      background: "Studio Background",
      rating: 5,
      downloads: 1
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      createdAt: new Date('2025-01-05'),
      outfit: "Casual Shirt",
      background: "Neutral Background",
      rating: 4,
      downloads: 2
    }
  ];

  const displayHeadshots = headshots?.length > 0 ? headshots : mockHeadshots;

  const handleDownload = (headshot) => {
    if (onDownload) {
      onDownload(headshot);
    } else {
      // Default download behavior
      const link = document.createElement('a');
      link.href = headshot?.url;
      link.download = `headshot-${headshot?.id}.jpg`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    }
  };

  const handleDelete = (headshot) => {
    if (onDelete) {
      onDelete(headshot);
    } else {
      console.log('Delete headshot:', headshot?.id);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(date);
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="Camera" size={32} className="text-text-secondary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No headshots yet
      </h3>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        Create your first professional headshot by uploading a selfie and selecting your preferred style.
      </p>
      <Button
        variant="default"
        iconName="Plus"
        iconPosition="left"
        onClick={() => window.location.href = '/headshot-generation'}
      >
        Create First Headshot
      </Button>
    </div>
  );

  if (displayHeadshots?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Your Headshots</h2>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Your Headshots</h2>
        <div className="text-sm text-text-secondary">
          {displayHeadshots?.length} headshot{displayHeadshots?.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayHeadshots?.map((headshot) => (
          <div
            key={headshot?.id}
            className="group relative bg-muted rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
          >
            {/* Image */}
            <div className="aspect-square relative">
              <Image
                src={headshot?.thumbnail || headshot?.url}
                alt={`Headshot ${headshot?.id}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(headshot)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(headshot)}
                  iconName="Trash2"
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {formatDate(headshot?.createdAt)}
                </span>
                {headshot?.rating && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm text-text-secondary">{headshot?.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-text-secondary">
                  <span className="font-medium">Outfit:</span> {headshot?.outfit}
                </p>
                <p className="text-xs text-text-secondary">
                  <span className="font-medium">Background:</span> {headshot?.background}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name="Download" size={12} />
                  <span>{headshot?.downloads} downloads</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedHeadshot(headshot)}
                  iconName="Eye"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View Modal */}
      {selectedHeadshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedHeadshot(null)}
          />
          <div className="relative bg-background rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Headshot Preview
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedHeadshot(null)}
                iconName="X"
              />
            </div>
            
            <div className="p-4">
              <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={selectedHeadshot?.url}
                  alt={`Headshot ${selectedHeadshot?.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm">
                  <span className="font-medium text-foreground">Created:</span>{' '}
                  <span className="text-text-secondary">{formatDate(selectedHeadshot?.createdAt)}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-foreground">Outfit:</span>{' '}
                  <span className="text-text-secondary">{selectedHeadshot?.outfit}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-foreground">Background:</span>{' '}
                  <span className="text-text-secondary">{selectedHeadshot?.background}</span>
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={() => handleDownload(selectedHeadshot)}
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1"
                >
                  Download
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedHeadshot);
                    setSelectedHeadshot(null);
                  }}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadshotGallery;