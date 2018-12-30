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
import { getFullName } from './helpers'

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
            {users.map(
              ({ email, first_name, last_name, dob, phone, active }) => {
                return (
                  <TableRow key={email}>
                    <TableCell>{getFullName(first_name, last_name)}</TableCell>
                    <TableCell>{format(new Date(dob), 'DD-MM-YYYY')}</TableCell>
                    <TableCell>
                      {differenceInYears(Date.now(), new Date(dob)) + ' Years'}
                    </TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell
                      style={{
                        color: getActiveColorStyle(active),
                        fontWeight: 'bold',
                      }}
                    >
                      {getActiveText(active)}
                    </TableCell>
                    <TableCell>
                      <UserActions actions={userActions} isActive={active} />
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default UserTable
