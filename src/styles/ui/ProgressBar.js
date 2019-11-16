import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const ProgressBarWrapper = styled.div`
  position: relative;
  height: 4px;
  background-color: ${ props => props.theme.color.card || 'gray' };
  border-radius: ${ props => props.theme.other.borderRadius || '2px' };
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 8px;
  }
`

const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background-color: ${ props => props.theme.color.positive || 'green' };
  border-radius: ${ props => props.theme.other.borderRadius || '2px' };
  transition: .3s ease-in-out;
`

const ProgressBar = ({max=100, value}) => (
  <ProgressBarWrapper aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
    <Bar style={{ width: `${value}%`}} />
  </ProgressBarWrapper>
)

ProgressBar.propTypes = {
  max: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
}

export default ProgressBar