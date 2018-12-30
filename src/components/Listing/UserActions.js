import React from 'react'
import { Button } from '@material-ui/core'

const UserActions = ({ actions, isActive }) => {
  return actions
    .filter(action => {
      if (isActive && action.actionName === 'Activate') {
        return false
      }
      if (!isActive && action.actionName === 'Deactivate') {
        return false
      }
      return true
    })
    .map(action => (
      <Button key={action.actionId} variant="outlined" color={action.color}>
        {action.actionName}
      </Button>
    ))
}

export default UserActions
