import PropTypes from 'prop-types'
import React from 'react'
import styled, {keyframes} from 'styled-components'
import Icon from './Icon'

const typing = keyframes`
  0% {
    content: '';
  }
  25% {
    content: '.';
  }
  50% {
    content: '..';
  }
  75% {
    content: '...';
  }
`

const StyledP = styled.p`
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
  color: ${ props => props.theme.color.cardStrong };
  svg {
    color: ${ props => props.theme.color.positive };
    margin-right: 1em;
  }

  &::after {
    content: '';
    width: 0;
    display: inline-block;
    color: ${ props => props.theme.color.positive };
    letter-spacing: 0.1em;
    animation: ${typing} .7s infinite ease-in-out;
  }
`

const Loading = props => (
  <StyledP {...props}>
    <Icon rotate={1} name="circular-graph" size={13} />{' '}{props.text ? props.text : 'Ładowanie'}
  </StyledP>
)

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading