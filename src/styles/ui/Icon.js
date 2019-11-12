import PropTypes from 'prop-types'
import React from 'react'
import iconPaths from './icomoon_selection.json'
import styled, { keyframes, css } from 'styled-components'

const rotate = keyframes`
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
`

const StyledIcon = styled.svg`
  display: inline-block;
  vertical-align: sub;
  ${props => props.rotate && css`
    animation: ${rotate} .4s infinite linear;
  `}

  ${ props => props.negative && css`
    color: ${ props => props.theme.color.negative || 'Red' };
  `} 

  ${ props => ( props.negative || props.negativeActive ) && css`
    :hover, :focus {
      color: ${ props => props.theme.color.negativeLife || 'Red' };
    }
  `}

  ${ props => props.positive && css`
    color: ${ props => props.theme.color.positive || 'Green' };
  `}

  ${ props => ( props.positive || props.positiveActive ) && css`
    :hover, :focus {
      color: ${ props => props.theme.color.positiveLife || 'Green' };
    }
  `}
`

function getIconPath(iconName) {
  const icon = iconPaths.icons.find(icon => icon.properties.name === iconName)
  if (icon) {
    return icon.icon.paths.join(' ')
  } else {
    console.warn(`Icon ${iconName} does not exist.`)
    return ''
  }
}

const Icon = props => (
  <StyledIcon height={props.size ? props.size : 22} viewBox="0 0 1024 1024" {...props}>
    <path d={getIconPath(props.name)}></path>
  </StyledIcon>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
}

export default Icon