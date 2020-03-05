import React from 'react'
import Notification from './Notification'
import * as notifications from '../../actions/notifications'

import TestWrapper from '../Wrappers/TestWrapper'

import { configure, mount } from 'enzyme'
import { act } from '@testing-library/react'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

const spy = jest.spyOn(notifications, 'removeNotification')
spy.mockImplementation( data => {
  return { type: 'TEST', id: data.id }
})

describe('<Notification>', () => {
  it('Displaying title, message and subtitle', () => {
    const wrapper = mount(<TestWrapper><Notification id="test-id" title="Title" subtitle="Subtitle" message="Message" /></TestWrapper>)
    expect(wrapper.text().includes('Title')).toBe(true)
    expect(wrapper.text().includes('Subtitle')).toBe(true)
    expect(wrapper.text().includes('Message')).toBe(true)
  })

  it('Displaying defualt title', () => {
    const wrapper = mount(<TestWrapper><Notification id="test-id" /></TestWrapper>)
    expect(wrapper.text().includes('Powiadomienie')).toBe(true)
  })

  it('Displaying loading icon without progressbar', () => {
    const wrapper = mount(<TestWrapper><Notification id="test-id" type="loading" /></TestWrapper>)
    expect( wrapper.find('svg[name="circular-graph"]').length ).toEqual(1)
    expect( wrapper.find('ProgressBar').length ).toEqual(0)
  })

  it('Displaying progressbar', () => {
    const wrapper = mount(<TestWrapper><Notification id="test-id" type="loading" percent={50} /></TestWrapper>)
    expect( wrapper.find('ProgressBar').length ).toEqual(1)
  })

  it('Displaying success icon', () => {
    const wrapper = mount(<TestWrapper><Notification id="test-id" type="success" /></TestWrapper>)
    expect( wrapper.find('svg[name="check"]').length ).toEqual(1)
  })

  it('Close notification action', async () => {
    const wrapper = mount(<TestWrapper><Notification id="test-id" /></TestWrapper>)

    await act(async() => {
      wrapper.find('.close').first().simulate('click') 
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveReturnedWith({type: 'TEST', id: 'test-id'})
  })
})
