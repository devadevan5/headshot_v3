import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const ContentManagementTab = () => {
  const [activeSection, setActiveSection] = useState('outfits');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const outfitData = [
    {
      id: 1,
      name: "Professional Suit - Navy",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      trending: true,
      uploadDate: "2025-01-10",
      status: "active"
    },
    {
      id: 2,
      name: "Business Casual - White Shirt",
      category: "Business Casual",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      trending: false,
      uploadDate: "2025-01-08",
      status: "active"
    },
    {
      id: 3,
      name: "Casual Polo - Blue",
      category: "Casual",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      trending: true,
      uploadDate: "2025-01-05",
      status: "active"
    }
  ];

  const backgroundData = [
    {
      id: 1,
      name: "Modern Office",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop",
      trending: true,
      uploadDate: "2025-01-12",
      status: "active"
    },
    {
      id: 2,
      name: "Minimalist White",
      category: "Aesthetic",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150&h=150&fit=crop",
      trending: false,
      uploadDate: "2025-01-09",
      status: "active"
    },
    {
      id: 3,
      name: "Urban Cityscape",
      category: "Casual",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=150&fit=crop",
      trending: true,
      uploadDate: "2025-01-07",
      status: "active"
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'professional', label: 'Professional' },
    { value: 'business-casual', label: 'Business Casual' },
    { value: 'casual', label: 'Casual' },
    { value: 'aesthetic', label: 'Aesthetic' },
    { value: 'seasonal', label: 'Seasonal' }
  ];

  const getCurrentData = () => {
    return activeSection === 'outfits' ? outfitData : backgroundData;
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    const currentData = getCurrentData();
    if (selectedItems?.length === currentData?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData?.map(item => item?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    setSelectedItems([]);
  };

  const toggleTrending = (itemId) => {
    console.log(`Toggle trending for item ${itemId}`);
  };

  const filteredData = getCurrentData()?.filter(item => {
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item?.category?.toLowerCase()?.replace(' ', '-') === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveSection('outfits')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeSection === 'outfits' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Outfits
        </button>
        <button
          onClick={() => setActiveSection('backgrounds')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeSection === 'backgrounds' ?'bg-background text-foreground shadow-sm' :'text-text-secondary hover:text-foreground'
          }`}
        >
          Backgrounds
        </button>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
            type="search"
            placeholder={`Search ${activeSection}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="sm:w-64"
          />
          <Select
            options={categoryOptions}
            value={filterCategory}
            onChange={setFilterCategory}
            placeholder="Filter by category"
            className="sm:w-48"
          />
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => console.log(`Upload new ${activeSection?.slice(0, -1)}`)}
        >
          Upload {activeSection === 'outfits' ? 'Outfit' : 'Background'}
        </Button>
      </div>
      {/* Bulk Actions */}
      {selectedItems?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {selectedItems?.length} item{selectedItems?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Star"
              iconPosition="left"
              onClick={() => handleBulkAction('trending')}
            >
              Mark Trending
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Archive"
              iconPosition="left"
              onClick={() => handleBulkAction('archive')}
            >
              Archive
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Content Grid */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedItems?.length === filteredData?.length && filteredData?.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              {activeSection === 'outfits' ? 'Outfit' : 'Background'} Library
            </span>
          </div>
        </div>

        {/* Content List */}
        <div className="divide-y divide-border">
          {filteredData?.map((item) => (
            <div key={item?.id} className="px-6 py-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedItems?.includes(item?.id)}
                  onChange={() => handleSelectItem(item?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {item?.name}
                    </h3>
                    {item?.trending && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        <Icon name="TrendingUp" size={12} className="mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>{item?.category}</span>
                    <span>•</span>
                    <span>Uploaded {item?.uploadDate}</span>
                    <span>•</span>
                    <span className="capitalize">{item?.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={item?.trending ? "Star" : "StarOff"}
                    onClick={() => toggleTrending(item?.id)}
                    className={item?.trending ? "text-accent" : ""}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => console.log(`Edit item ${item?.id}`)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreVertical"
                    onClick={() => console.log(`More options for item ${item?.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData?.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
            <p className="text-text-secondary">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagementTab;