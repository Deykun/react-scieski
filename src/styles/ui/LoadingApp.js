import React from 'react'
import styled from 'styled-components'
import Loading from './Loading'

const StyledPlaceholder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: column;
  background-color: ${ props => props.theme.background.card || 'black' };
`

const LoadingApp = props => (
  <StyledPlaceholder {...props}>
    <Loading text="Loading Scieski" />
  </StyledPlaceholder>
)

export default LoadingApp