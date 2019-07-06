import React from 'react';
import iconPaths from './icomoon_selection.json';

function getIconPath(iconName) {
  const icon = iconPaths.icons.find(icon => icon.properties.name === iconName);
  if (icon) {
    return icon.icon.paths.join(' ');
  } else {
    console.warn(`Icon ${iconName} does not exist.`);
    return '';
  }
}

const Icon = props => (
  <svg width="22" height="22" viewBox="0 0 1024 1024">
    <path d={getIconPath(props.name)}></path>
  </svg>
);

export default Icon;