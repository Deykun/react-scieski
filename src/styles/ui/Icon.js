import React from 'react';
import iconPaths from './icomoon_selection.json';
import styled from 'styled-components';

const StyledIcon = styled.svg`
`;

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
  <StyledIcon width="22" height="22" viewBox="0 0 1024 1024" {...props}>
    <path d={getIconPath(props.name)}></path>
  </StyledIcon>
);

export default Icon;