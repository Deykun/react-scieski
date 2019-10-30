import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import Icon from './Icon';
import tooltip from './tooltip'

const StyledButton = styled.button`
  /* Reset */
  display: inline-block;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  background-color: transparent;
  border: none;
  cursor: pointer;

  line-height: 22px;
  font-size: 15px;
  
  svg {
    :first-child {
      margin-right: 5px;
    }
    :last-child {
      margin-left: 5px;
    }
    :only-child {
      margin: 0;
    }
  }

  :focus {
    outline: none;
  }

   ${ props => props.negative && css`
    fill: ${ props => props.theme.color.negative || 'Red' };
    color: ${ props => props.theme.color.negative || 'Red' };
    :hover, :focus {
      fill: ${ props => props.theme.color.negativeLife || 'Red' };
      color: ${ props => props.theme.color.negativeLife || 'Red' };
    }
  `} 

  ${ props => props.positive && css`
    fill: ${ props => props.theme.color.positive || 'Green' };
    color: ${ props => props.theme.color.positive || 'Green' };
    :hover, :focus {
      fill: ${ props => props.theme.color.positiveLife || 'Green' };
      color: ${ props => props.theme.color.positiveLife || 'Green' };
    }
  `}
  ${ props => props['aria-label'] && css` ${tooltip}; `}
  transition: .2s ease-in-out;
`

const Button = props => (
  <StyledButton {...props}>
    {props.iconleft && <Icon name={props.iconleft} />}
    {props.children && <span>{props.children}</span>}
    {props.iconright && <Icon name={props.iconright} />}
  </StyledButton>
)

Button.propTypes = {
  iconleft: PropTypes.string,
  children: PropTypes.node,
  iconright: PropTypes.string,
}

export default Button