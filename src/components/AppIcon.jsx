import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

/**
 * Renders an icon from the lucide-react library.
 * If the icon is not found, it renders a HelpCircle icon.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.name - The name of the icon to render.
 * @param {number} [props.size=24] - The size of the icon.
 * @param {string} [props.color="currentColor"] - The color of the icon.
 * @param {string} [props.className=""] - Additional CSS classes for the icon.
 * @param {number} [props.strokeWidth=2] - The stroke width of the icon.
 * @returns {JSX.Element} The rendered icon component.
 */
function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) {
    const IconComponent = LucideIcons?.[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;