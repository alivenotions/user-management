import React, { Component } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core'
import { format, differenceInYears } from 'date-fns'
import UserActions from './UserActions'
import { USER_ACTIONS, TABLE_HEADERS } from '../../utils/constants/table-config'

const getActiveColorStyle = isActive => (isActive ? 'green' : 'red')
const getActiveText = isActive => (isActive ? 'Active' : 'Inactive')

class UserTable extends Component {
  state = {
    userActions: [],
  }

  componentDidMount() {
    this.setState({
      // This is done to increase the customizability of the actions.
      // If anytime in the future, the business requirement changes,
      // just add a filter to the chain to filter out the ones that
      // are not to be shown.
      userActions: USER_ACTIONS.map(action =>
        Object.assign({}, action, { toShow: true })
      ),
    })
  }

  render() {
    const { users } = this.props
    const { userActions } = this.state
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEADERS.map(headers => (
                <TableCell key={headers.id}> {headers.value} </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => {
              return (
                <TableRow key={user.email}>
                  <TableCell>
                    {user.first_name + ' ' + user.last_name}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.dob), 'DD-MM-YYYY')}
                  </TableCell>
                  <TableCell>
                    {differenceInYears(Date.now(), new Date(user.dob)) +
                      ' Years'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell
                    style={{
                      color: getActiveColorStyle(user.active),
                      fontWeight: 'bold',
                    }}
                  >
                    {getActiveText(user.active)}
                  </TableCell>
                  <TableCell>
                    <UserActions actions={userActions} isActive={user.active} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default UserTable
