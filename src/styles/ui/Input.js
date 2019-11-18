import { v4 } from 'node-uuid'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div`
  margin: 5px 0;
  min-height: 34px;
  padding-top: 13px;
  position: relative;
`

const InputLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;

  font-size: 9px;
  letter-spacing: 0.05em;
  font-weight: 400;
  color: ${ props => props.theme.color.card || 'white' };

  transition: .15s ease-in-out;
`

const InputField = styled.input`
  /* Reset */
  background-color: transparent;
  width: 100%;
  border: 0;
  padding: 5px 0;
  margin: 0;

  font-size: 11px;
  line-height: 14px;
  font-weight: 400px;
  color: ${ props => props.theme.color.cardStrong || 'white' };

  caret-color: orange;
  &:hover, &:focus {
    + ${InputLabel} {
      color: ${ props => props.theme.color.positive || 'green' };
    }
  }
`


const Input = ( { id=v4() , value='', maxLength=100, placeholder='', label='', onChange } ) => {
  const [localValue, setLocalValue] = useState( value )

  const changeHandle = (e) => {
    onChange( e.target.value )
    setLocalValue( e.target.value )
  }

  return <InputWrapper>
    <InputField id={id} type="text" value={localValue} maxLength={maxLength} placeholder={placeholder} onChange={changeHandle} />
    {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
  </InputWrapper>
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Input