import React, { Component } from 'react'
import { http } from '../../utils/httpModule'
import { logUrlError } from '../../utils/errorLogs'

class Listing extends Component {
  componentDidMount() {
    http
      .GET('')
      .map(res => res.data)
      .fork(logUrlError, console.log)
  }

  render() {
    return <span>Listing</span>
  }
}

export default Listing
