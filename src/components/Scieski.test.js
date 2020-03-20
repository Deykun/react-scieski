import React from 'react'
import Scieski from './Scieski'
import StoreProvider from './Wrappers/StoreProvider'

import * as i18next from 'react-i18next'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

jest.mock('react-i18next')

describe('Scieski', () => {
  it('Renders <Editor> without crashing', () => {
    i18next.useTranslation.mockReturnValue({
      t: (txt) => txt
    })
    const wrapper = mount(<StoreProvider><Scieski /></StoreProvider>)
    expect(wrapper.find('Editor').length).toEqual(1)
  })
})
