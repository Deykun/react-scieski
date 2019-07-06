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
  cursor: pointer;
  ${props => props['aria-label'] && css`
    ${tooltip};
  `};
`;

const Button = props => (
  <StyledButton {...props}>
    {props.iconleft && <Icon name={props.iconleft} />}
    {props.children && <span>{props.children}</span>}
    {props.iconright && <Icon name={props.iconright} />}
  </StyledButton>
);

export default Button;