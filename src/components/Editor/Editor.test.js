import React from 'react'
import Editor from './Editor'

import * as i18next from 'react-i18next'

import TestWrapper from '../Wrappers/TestWrapper'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import routeData from 'react-router'

jest.mock('react-i18next')

describe('<Editor>', () => {
  
  i18next.useTranslation.mockReturnValue({
    t: (txt) => txt
  })

  it('Is closed for / location', () => {
    const mockLocation = {
      pathname: '/',
      hash: '',
      search: '',
      state: ''
    }
    jest.spyOn(routeData, 'useLocation').mockReturnValue( mockLocation )
    
    const wrapper = mount(<TestWrapper><Editor /></TestWrapper>)
    expect( wrapper.find('Editor').childAt(0).hasClass('open') ).toBe(false)
  })
  
  it('Is open for /editor location', () => {
    const mockLocation = {
      pathname: '/editor',
      hash: '',
      search: '',
      state: ''
    }
    jest.spyOn(routeData, 'useLocation').mockReturnValue( mockLocation )
    const wrapper = mount(<TestWrapper><Editor /></TestWrapper>)
    expect( wrapper.find('Editor').childAt(0).hasClass('open') ).toBe(true)
  })
})
