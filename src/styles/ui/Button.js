import React from 'react';
import styled, { css } from 'styled-components';
import Icon from './Icon';
import tooltip from './tooltip';

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
    &:first-child {
      margin-right: 5px;
    }
    &:last-child {
      margin-left: 5px;
    }
    &:only-child {
      margin: 0;
    }
  }

  &:focus {
    outline: none;
  }

  ${ props => props.danger && css`
    fill: ${ props => props.theme.color.danger || 'Red' };
    color: ${ props => props.theme.color.danger || 'Red' };
    &:hover {
      fill: ${ props => props.theme.color.danger75 || 'Red' };
      color: ${ props => props.theme.color.danger75 || 'Red' };
    }
  `} 

  ${ props => props.main && css`
    fill: ${ props => props.theme.color.main || 'Green' };
    color: ${ props => props.theme.color.main || 'Green' };
    &:hover {
      fill: ${ props => props.theme.color.main75 || 'Green' };
      color: ${ props => props.theme.color.main75 || 'Green' };
    }
  `}

  ${ props => props['aria-label'] && css`
    ${tooltip};
  `};
  transition: .2s ease-in-out;
`;

const Button = props => (
  <StyledButton {...props}>
    {props.iconleft && <Icon name={props.iconleft} />}
    {props.children && <span>{props.children}</span>}
    {props.iconright && <Icon name={props.iconright} />}
  </StyledButton>
);

export default Button;