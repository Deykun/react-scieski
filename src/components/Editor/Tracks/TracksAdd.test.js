import React from 'react'
import TracksAdd from './TracksAdd'
import * as notifications from '../../../actions/notifications'

import TestWrapper from '../../Wrappers/TestWrapper'

import { configure, mount } from 'enzyme'
import { act } from '@testing-library/react'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

const spy = jest.spyOn(notifications, 'addNotification')
spy.mockImplementation( data => {
  return { type: 'TEST', code: data.code }
})

describe('<TracksAdd>', () => {
  it('Renders dropzone', () => {
    const wrapper = mount(<TestWrapper><TracksAdd /></TestWrapper>)
    expect( wrapper.find('TracksAdd').length ).toEqual(1)
  })

  it('Wrong format dropped', async () => {
    const wrapper = mount(<TestWrapper><TracksAdd /></TestWrapper>)

    const fileWithWrongFile = {
      name: 'fakeimage.jpg',
      path: 'fakeimage.jpg',
      size: 200,
      type: 'image/jpeg'
    }

    expect( wrapper.find('input').length ).toEqual(1)

    await act(async() => {
      wrapper.find('input').first().simulate('change', { 
        target: { files: [ fileWithWrongFile ] },
        preventDefault: () => {},
        persist: () => {},
      }) 
    })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveReturnedWith({type: 'TEST', code: 'FILE_FORMAT_REJECTED'})
    
  })
  
})
