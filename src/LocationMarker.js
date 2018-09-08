import React, { Component } from 'react'
import { IconButton, Tooltip } from '@material-ui/core';
import { MyLocation as LocationIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'blue',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .3)'
    }
  }
})

class LocationMarker extends Component {
  render() {
    const { classes } = this.props

    return (
      <Tooltip title='Current Location'>
        <IconButton className={classes.marker}>
          <LocationIcon />
        </IconButton>
      </Tooltip>
    )
  }
}


export default withStyles(styles)(LocationMarker)
