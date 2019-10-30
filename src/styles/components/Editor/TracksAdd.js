import styled, {css} from 'styled-components'

// import textGradient from '../../styles/enhancements/textGradient'

const dragOrHover = css`
  &::before {
    border-color: ${ props => props.theme.color.positiveLife };  
  }
  p {
    ${'' /* ${ textGradient }; */}
  }
  svg {
    opacity: .6;
  }
  * {
    transition: .9s ease-in-out;
  }
`

export const DropZoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  margin-bottom: 15px;
  padding: 25px 10px;

  text-align: center;
  font-weight: 300;
  font-size: 11px;
  line-height: 18px;

  position: relative;
  overflow: hidden; 
  &::before {
    content: "";
    pointer-events: none;
    position: absolute;
    border: 2px dashed ${ props => props.theme.color.card || 'red' };
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    border-radius: 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    opacity: .3;
  }

  cursor: pointer;
  * {
   pointer-events: none;
  }
  position: relative;
  svg {
    position: absolute;
    height: 25px;
    right: 7px;
    bottom: 7px;
    opacity: .3;
    z-index: 1;
  }
  p {
    position: relative;
    z-index: 2;
  }
  strong {
    font-weight: 400;
    color: ${ props => props.theme.color.cardStrong };
  }
  .positive {
    color: ${ props => props.theme.color.positive || 'green' };
  }
  ${props => props.isDragActive && css`
    ${dragOrHover}
  `}
  :hover {
    ${dragOrHover}
  }
  :focus {
    outline: none;
    border-color: ${ props => props.theme.color.positive || 'red' };
  }
  * {
    transition: .9s ease-in-out; 
  }
`