import React from 'react'
import { render } from 'react-testing-library'

import App from './App'

describe('App component', () => {
  test('app renders the pages according to the route', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    expect(getByTestId('listing')).toBeInTheDocument()
    expect(queryByTestId('details')).not.toBeInTheDocument()
  })
})
