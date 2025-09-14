import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ 
  totalHeadshots = 3,
  thisMonthHeadshots = 2,
  totalDownloads = 6,
  averageRating = 4.3
}) => {
  const stats = [
    {
      label: 'Total Headshots',
      value: totalHeadshots,
      icon: 'Camera',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'This Month',
      value: thisMonthHeadshots,
      icon: 'Calendar',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Downloads',
      value: totalDownloads,
      icon: 'Download',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Avg Rating',
      value: averageRating?.toFixed(1),
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-6">Quick Stats</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-text-secondary">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsCard;