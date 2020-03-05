import React from 'react'
import Scieski from './Scieski'
import StoreProvider from './Wrappers/StoreProvider'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Scieski', () => {
  it('Renders <Editor> without crashing', () => {
    const wrapper = mount(<StoreProvider><Scieski /></StoreProvider>)
    expect(wrapper.find('Editor').length).toEqual(1)
  })
})
