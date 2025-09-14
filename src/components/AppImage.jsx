import React from 'react';

/**
 * Renders an image with a fallback to a default image if the source is not found.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} [props.alt="Image Name"] - The alternative text for the image.
 * @param {string} [props.className=""] - Additional CSS classes for the image.
 * @returns {JSX.Element} The rendered image component.
 */
function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;
