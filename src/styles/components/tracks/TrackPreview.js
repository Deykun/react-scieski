import styled, {css, keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import tooltip from '../../ui/tooltip';
import Dropdown from '../../ui/Dropdown';

export const newTrackPreview = keyframes`
  0% {
    transform: translateY(-100px) scale(.7);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

export const Wrapper = styled.li`
  position: relative;
  padding: 12px;
  margin: 15px;
  background-color: ${ props => props.theme.background.component || 'white' }; 
  border: 1px solid ${ props => props.theme.color.border || 'gray' };
  border-radius: 2px;
  box-shadow: 0 8px 4px -8px rgba(0,0,0,.2), 0 12px 8px -12px rgba(0,0,0,.4);
  :focus, :focus-within {
    outline: none;
    box-shadow: 0 8px 4px -8px rgba(0,0,0,.6), 0 12px 8px -12px rgba(0,0,0,.4);
  }
  animation: ${newTrackPreview} .3s ease-in-out;
  transition: .2s ease-in-out;
`;

export const Title = styled(Link)`
  display: block;
  margin-bottom: 12px;
  padding-right: 25px;
  font-size: 12px;
  font-weight: 500;
  word-break: break-word;
  :focus, :focus-within {
    outline: none;
    opacity: .5 ;
  }
`;

export const ActionsDropdown = styled(Dropdown)`
  position: absolute;
  right: 12px;
  top: 8px;
  .dropdown-list {
    right: 0;
    left: auto;
    transform: translateX(0);
  }
`

export const DataCells = styled.ul`
`;

export const DataCell = styled.span`
  font-size: 12px;
  svg {
    fill: ${ props => props.theme.color.active75 || 'black' };
  }
  ${props => props['aria-label'] && css`
    cursor: help;
    ${tooltip};
  `};
  :not(:last-child) {
    margin-right: 10px;
  }
`;

export const Footer = styled.div`
  text-align: right;
  font-size: 12px;
  font-weight: 400;
  color: ${ props => props.theme.color.textMuted || 'gray' };
  [aria-label] {
    cursor: help;
    ${tooltip};
  }
`;