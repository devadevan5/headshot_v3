import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * A component that allows users to select an outfit for their headshot.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.selectedOutfit - The currently selected outfit.
 * @param {function} props.onOutfitSelect - A function to be called when an outfit is selected.
 * @param {boolean} [props.isProcessing=false] - Whether the component is in a processing state.
 * @returns {JSX.Element} The rendered outfit selection component.
 */
const OutfitSelection = ({ selectedOutfit, onOutfitSelect, isProcessing = false }) => {
  const [activeCategory, setActiveCategory] = useState('trending');

  const outfitCategories = [
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { id: 'professional', label: 'Professional', icon: 'Briefcase' },
    { id: 'business-casual', label: 'Business Casual', icon: 'Users' },
    { id: 'casual', label: 'Casual', icon: 'Coffee' },
    { id: 'seasonal', label: 'Seasonal', icon: 'Calendar' }
  ];

  const outfitData = {
    trending: [
      {
        id: 'trend-1',
        name: 'Modern Executive',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Contemporary business suit',
        popular: true
      },
      {
        id: 'trend-2',
        name: 'Smart Casual',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Blazer with casual shirt',
        popular: true
      },
      {
        id: 'trend-3',
        name: 'Creative Professional',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Stylish modern look',
        popular: false
      },
      {
        id: 'trend-4',
        name: 'Tech Executive',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Modern tech industry style',
        popular: false
      }
    ],
    professional: [
      {
        id: 'prof-1',
        name: 'Classic Business Suit',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Traditional navy business suit',
        popular: false
      },
      {
        id: 'prof-2',
        name: 'Executive Formal',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Premium formal attire',
        popular: false
      },
      {
        id: 'prof-3',
        name: 'Corporate Leader',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Senior executive style',
        popular: false
      },
      {
        id: 'prof-4',
        name: 'Banking Professional',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Conservative business look',
        popular: false
      }
    ],
    'business-casual': [
      {
        id: 'bc-1',
        name: 'Smart Blazer',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Blazer with open collar',
        popular: false
      },
      {
        id: 'bc-2',
        name: 'Polo Professional',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Smart polo shirt look',
        popular: false
      },
      {
        id: 'bc-3',
        name: 'Cardigan Style',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Comfortable yet professional',
        popular: false
      },
      {
        id: 'bc-4',
        name: 'Sweater Professional',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Refined casual look',
        popular: false
      }
    ],
    casual: [
      {
        id: 'cas-1',
        name: 'Relaxed Shirt',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Comfortable casual shirt',
        popular: false
      },
      {
        id: 'cas-2',
        name: 'Weekend Look',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Laid-back style',
        popular: false
      },
      {
        id: 'cas-3',
        name: 'Casual Friday',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Office casual attire',
        popular: false
      },
      {
        id: 'cas-4',
        name: 'Everyday Comfort',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Comfortable daily wear',
        popular: false
      }
    ],
    seasonal: [
      {
        id: 'sea-1',
        name: 'Winter Professional',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Warm professional attire',
        popular: false
      },
      {
        id: 'sea-2',
        name: 'Summer Business',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Light summer professional',
        popular: false
      },
      {
        id: 'sea-3',
        name: 'Spring Fresh',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Fresh spring look',
        popular: false
      },
      {
        id: 'sea-4',
        name: 'Autumn Classic',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Classic autumn style',
        popular: false
      }
    ]
  };

  const currentOutfits = outfitData?.[activeCategory] || [];

  /**
   * Handles the selection of an outfit.
   * @param {object} outfit - The selected outfit.
   */
  const handleOutfitSelect = (outfit) => {
    if (!isProcessing) {
      onOutfitSelect(outfit);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {outfitCategories?.map((category) => (
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
      {/* Outfit Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentOutfits?.map((outfit) => (
          <div
            key={outfit?.id}
            className={`
              relative group cursor-pointer transition-all duration-200
              ${selectedOutfit?.id === outfit?.id
                ? 'ring-2 ring-primary ring-offset-2' :'hover:scale-105'
              }
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => handleOutfitSelect(outfit)}
          >
            <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <Image
                src={outfit?.image}
                alt={outfit?.name}
                className="w-full h-full object-cover"
              />

              {/* Popular Badge */}
              {outfit?.popular && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}

              {/* Selection Indicator */}
              {selectedOutfit?.id === outfit?.id && (
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
                {outfit?.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {outfit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Selection Summary */}
      {selectedOutfit && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-16 bg-muted rounded overflow-hidden">
              <Image
                src={selectedOutfit?.image}
                alt={selectedOutfit?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">
                Selected Outfit: {selectedOutfit?.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {selectedOutfit?.description}
              </p>
            </div>
            <Icon name="Check" size={20} className="text-success" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitSelection;