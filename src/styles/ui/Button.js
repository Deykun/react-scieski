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

  ${ props => props.danger && css`
    fill: ${ props => props.theme.colorDanger || 'Red' };
    color: ${ props => props.theme.colorDanger || 'Red' };
    &:hover {
      fill: ${ props => props.theme.colorDanger75 || 'Red' };
      color: ${ props => props.theme.colorDanger75 || 'Red' };
    }
  `}
  ${ props => props.main && css`
    fill: ${ props => props.theme.colorMain || 'Red' };
    color: ${ props => props.theme.colorMain || 'Red' };
    &:hover {
      fill: ${ props => props.theme.colorMain75 || 'Red' };
      color: ${ props => props.theme.colorMain75 || 'Red' };
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