import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'
import { http } from '../../utils/httpModule'
import { Resolved } from 'crocks/Async'

import Listing from './Listing'
import { getFullName } from './helpers'

const mockUser1 = {
  first_name: 'Greg',
  last_name: 'William',
  email: 'wil.greg@yahoo.com',
  phone: '9121133547',
  dob: 360873000,
  active: false,
}
const mockPayload = { data: { users: [mockUser1] } }

describe('Listing component', () => {
  test('typing in the search filterbox shows the value on the screen', () => {
    const { getByLabelText } = render(<Listing />)
    const searchBox = getByLabelText(/search/i)
    expect(searchBox).toBeInTheDocument()
    fireEvent.change(searchBox, {
      target: { value: 'David' },
    })
    expect(searchBox.value).toEqual('David')
  })

  test('get the full name of a user on the table', async () => {
    http.GET = jest.fn(() => Resolved(mockPayload))

    const { getByText } = render(<Listing />)
    await wait(() => getByText(mockUser1.email))
    const fullName = getByText(
      getFullName(mockUser1.first_name, mockUser1.last_name)
    )

    expect(fullName).toBeDefined()
  })

  test('the color of inactive user to be in red', async () => {
    http.GET = jest.fn(() => Resolved(mockPayload))

    const { getByText } = render(<Listing />)
    await wait(() => getByText(mockUser1.email))
    const activeStatus = getByText('Inactive')

    expect(activeStatus.style.color).toEqual('red')
  })

  test('on typing on the search filterbox, the table should get filtered', () => {
    http.GET = jest.fn(() => Resolved(mockPayload))

    const { getByLabelText, getByText, queryByText } = render(<Listing />)
    const searchBox = getByLabelText(/search/i)
    fireEvent.change(searchBox, {
      // the mock user name is Greg William
      target: { value: 'reg' },
    })
    const fullName = getFullName(mockUser1.first_name, mockUser1.last_name)
    expect(getByText(fullName)).toBeDefined()

    fireEvent.change(searchBox, {
      // the mock user name is Greg William
      target: { value: 'rega' },
    })
    expect(queryByText(fullName)).toBeNull()
  })
})
