import React, { Component } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import Details from './Details/Details'
import Listing from './Listing/Listing'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" exact to="/listing" />
          <Route path="/listing" component={Listing} />
          <Route path="/details/:email" component={Details} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App