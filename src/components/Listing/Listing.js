import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { http } from '../../utils/httpModule'
import { logUrlError } from '../../utils/errorLogs'
import { USERS_URL } from '../../utils/constants'
import UserTable from './UserTable'

class Listing extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    http
      .GET(USERS_URL)
      .map(res => res.data.users)
      .fork(logUrlError, users => this.setState({ users }))
  }

  render() {
    const { users } = this.state
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <UserTable users={users} />
        </Grid>
      </Grid>
    )
  }
}

export default Listing
