import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BackgroundSelection = ({ selectedBackground, onBackgroundSelect, isProcessing = false }) => {
  const [activeCategory, setActiveCategory] = useState('trending');

  const backgroundCategories = [
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { id: 'professional', label: 'Professional', icon: 'Building' },
    { id: 'casual', label: 'Casual', icon: 'Home' },
    { id: 'aesthetic', label: 'Aesthetic', icon: 'Palette' },
    { id: 'seasonal', label: 'Seasonal', icon: 'Calendar' }
  ];

  const backgroundData = {
    trending: [
      {
        id: 'trend-bg-1',
        name: 'Modern Office',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Contemporary workspace',
        popular: true
      },
      {
        id: 'trend-bg-2',
        name: 'City Skyline',
        image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Urban professional backdrop',
        popular: true
      },
      {
        id: 'trend-bg-3',
        name: 'Minimalist Studio',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Clean modern background',
        popular: false
      },
      {
        id: 'trend-bg-4',
        name: 'Tech Hub',
        image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'High-tech environment',
        popular: false
      }
    ],
    professional: [
      {
        id: 'prof-bg-1',
        name: 'Executive Office',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Traditional office setting',
        popular: false
      },
      {
        id: 'prof-bg-2',
        name: 'Conference Room',
        image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Professional meeting space',
        popular: false
      },
      {
        id: 'prof-bg-3',
        name: 'Corporate Lobby',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Business entrance area',
        popular: false
      },
      {
        id: 'prof-bg-4',
        name: 'Boardroom',
        image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Executive meeting room',
        popular: false
      }
    ],
    casual: [
      {
        id: 'cas-bg-1',
        name: 'Coffee Shop',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Relaxed cafe environment',
        popular: false
      },
      {
        id: 'cas-bg-2',
        name: 'Home Office',
        image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Comfortable workspace',
        popular: false
      },
      {
        id: 'cas-bg-3',
        name: 'Library',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Quiet study space',
        popular: false
      },
      {
        id: 'cas-bg-4',
        name: 'Co-working Space',
        image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Collaborative environment',
        popular: false
      }
    ],
    aesthetic: [
      {
        id: 'aes-bg-1',
        name: 'Gradient Blue',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Smooth blue gradient',
        popular: false
      },
      {
        id: 'aes-bg-2',
        name: 'Warm Bokeh',
        image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Soft blurred lights',
        popular: false
      },
      {
        id: 'aes-bg-3',
        name: 'Abstract Pattern',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Artistic background',
        popular: false
      },
      {
        id: 'aes-bg-4',
        name: 'Neutral Texture',
        image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Subtle textured surface',
        popular: false
      }
    ],
    seasonal: [
      {
        id: 'sea-bg-1',
        name: 'Winter Elegance',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Cool winter tones',
        popular: false
      },
      {
        id: 'sea-bg-2',
        name: 'Spring Fresh',
        image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Bright spring colors',
        popular: false
      },
      {
        id: 'sea-bg-3',
        name: 'Summer Vibes',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Warm summer atmosphere',
        popular: false
      },
      {
        id: 'sea-bg-4',
        name: 'Autumn Warmth',
        image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Rich autumn colors',
        popular: false
      }
    ]
  };

  const currentBackgrounds = backgroundData?.[activeCategory] || [];

  const handleBackgroundSelect = (background) => {
    if (!isProcessing) {
      onBackgroundSelect(background);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {backgroundCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              disabled={isProcessing}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200
                ${activeCategory === category?.id
                  ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-foreground'
                }
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Background Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBackgrounds?.map((background) => (
          <div
            key={background?.id}
            className={`
              relative group cursor-pointer transition-all duration-200
              ${selectedBackground?.id === background?.id
                ? 'ring-2 ring-primary ring-offset-2' :'hover:scale-105'
              }
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => handleBackgroundSelect(background)}
          >
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <Image
                src={background?.image}
                alt={background?.name}
                className="w-full h-full object-cover"
              />
              
              {/* Popular Badge */}
              {background?.popular && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}

              {/* Selection Indicator */}
              {selectedBackground?.id === background?.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} />
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
            </div>

            <div className="mt-2 text-center">
              <h3 className="font-medium text-foreground text-sm">
                {background?.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {background?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Selection Summary */}
      {selectedBackground && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-12 bg-muted rounded overflow-hidden">
              <Image
                src={selectedBackground?.image}
                alt={selectedBackground?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">
                Selected Background: {selectedBackground?.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {selectedBackground?.description}
              </p>
            </div>
            <Icon name="Check" size={20} className="text-success" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSelection;