import React from 'react';
import iconPaths from './icomoon_selection.json';
import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
`;

const StyledIcon = styled.svg`
  display: inline-block;
  vertical-align: sub;
  ${props => props.rotate && css`
    animation: ${rotate} .4s infinite linear;
  `}
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
  <StyledIcon height={props.size ? props.size : 22} viewBox="0 0 1024 1024" {...props}>
    <path d={getIconPath(props.name)}></path>
  </StyledIcon>
);

export default Icon;