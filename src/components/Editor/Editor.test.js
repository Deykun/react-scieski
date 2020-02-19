import React from 'react'
import Editor from './Editor'

import TestWrapper from '../Wrappers/TestWrapper'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import routeData from 'react-router'

describe('<Editor>', () => {

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
