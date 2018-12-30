import React, { Component } from 'react'
import { TextField } from '@material-ui/core'

class FilterBox extends Component {
  handleChange = event => {
    this.props.handleFilterBoxChange(event.target.value)
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    const { value } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Search"
          styles={{ width: '50em' }}
          value={value}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
      </form>
    )
  }
}

export default FilterBox
