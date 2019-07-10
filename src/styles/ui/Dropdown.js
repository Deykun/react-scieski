import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const DropdownList = styled.div`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
  background-color: ${ props => props.theme.background.component || 'white' }; 
  border: 1px solid ${ props => props.theme.color.border || 'gray' };
  border-radius: ${ props => props.theme.other.borderRadius || '2px' };
  text-align: center;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  box-shadow: 0 0 0 0 rgba(0,0,0,.5), 0 0 0 0 rgba(0,0,0,.7);
  > * {
    display: block;
    width: 100%;
    padding: 4px 8px;
    text-align: center;
    white-space: nowrap;
    font-size: 13px;
    &:not(:last-child) {
      border-bottom: 1px solid ${ props => props.theme.color.border || 'gray' };
    }
    svg {
      height: 13px;
    }
  }
  transition: .2s ease-in-out;
`;

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 25px;
  text-align: center
  .dropdown-toggle {
    svg {
      margin: 0;
      transform: rotate(0deg);
      transition: .1s ease-in-out;
    }
  }
  &:hover, &:focus, &:focus-within {
    .dropdown-toggle {
      svg {
        transform: rotate(180deg);
      }
    }
    ${DropdownList} {
      max-height: 400px;
      opacity: 1;
      box-shadow: 0 8px 4px -8px rgba(0,0,0,.2), 0 12px 8px -12px rgba(0,0,0,.4);
    }
  }
  transition: .2s ease-in-out;
`;

const Dropdown = props => (
  <StyledDropdown {...props} >
    <Button className="dropdown-toggle" iconleft="chevron-down" tabIndex="0" />
    <DropdownList className="dropdown-list">
      {props.children}
    </DropdownList>
  </StyledDropdown>
);

export default Dropdown;