import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import UserTable from './UserTable'
import FilterBox from './FilterBox'

import { getFullName } from './helpers'
import { http } from '../../utils/httpModule'
import { logUrlError } from '../../utils/errorLogs'
import { USERS_URL } from '../../utils/constants/urls'

class Listing extends Component {
  state = {
    users: [],
    filterText: '',
  }

  componentDidMount() {
    http
      .GET(USERS_URL)
      .map(res => res.data.users)
      .fork(logUrlError, users => {
        localStorage.setItem('users', JSON.stringify(users))
        this.setState({ users })
      })
  }

  /**
   * @param { text } string
   */
  handleFilterBoxChange = text => {
    this.setState({ filterText: text })
  }

  filterUsersByText = (users, text) => {
    return users.filter(user => {
      const regex = new RegExp(text, 'i')
      if (
        regex.test(getFullName(user.first_name, user.last_name)) ||
        regex.test(user.email)
      ) {
        return true
      }
      return false
    })
  }

  render() {
    const { users, filterText } = this.state
    const filteredUsers = this.filterUsersByText(users, filterText)
    return (
      <Grid container spacing={16}>
        <Grid item xs={6}>
          <FilterBox handleFilterBoxChange={this.handleFilterBoxChange} />
        </Grid>
        <Grid item xs={12}>
          <UserTable searchValue={filterText} users={filteredUsers} />
        </Grid>
      </Grid>
    )
  }
}

export default Listing
