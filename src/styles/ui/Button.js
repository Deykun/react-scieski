import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import Icon from './Icon'
import { tooltip } from './tooltip'

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
  color: inherit;

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

  ${ props => props['aria-label'] && css` ${tooltip}; `}
  transition: .2s ease-in-out;
`

const Button = props => (
  <StyledButton {...props}>
    {props.iconleft && <Icon name={props.iconleft} size={props.iconsize} />}
    {props.children && <span>{props.children}</span>}
    {props.iconright && <Icon name={props.iconright} size={props.iconsize} />}
  </StyledButton>
)

Button.propTypes = {
  iconleft: PropTypes.string,
  children: PropTypes.node,
  iconright: PropTypes.string,
  iconsize: PropTypes.number,
}

export default Button