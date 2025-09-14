import React from 'react';
import Icon from '../../../components/AppIcon';

/**
 * @typedef {'positive' | 'negative'} ChangeType
 */

/**
 * A component that displays a single metric, including its title, value, change, and an icon.
 * It also has a loading state.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title of the metric.
 * @param {string} props.value - The value of the metric.
 * @param {string} props.change - The change in the metric.
 * @param {ChangeType} [props.changeType='positive'] - The type of change (positive or negative).
 * @param {string} props.icon - The name of the icon to display.
 * @param {string} props.description - A description of the metric.
 * @param {boolean} [props.loading=false] - Whether the component is in a loading state.
 * @returns {JSX.Element} The rendered metrics card.
 */
const MetricsCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  description,
  loading = false
}) => {
  /**
   * Returns the color class for the change indicator.
   * @returns {string} The color class.
   */
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  /**
   * Returns the icon name for the change indicator.
   * @returns {string} The icon name.
   */
  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-muted rounded-lg"></div>
          <div className="w-16 h-4 bg-muted rounded"></div>
        </div>
        <div className="w-24 h-8 bg-muted rounded mb-2"></div>
        <div className="w-32 h-4 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-text-secondary">{title}</p>
        {description && (
          <p className="text-xs text-text-secondary mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;