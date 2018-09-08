import React, { Component } from 'react'
import { IconButton, Tooltip } from '@material-ui/core';
import { Flag as FlagIcon } from '@material-ui/icons';
import { Check as CheckIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .3)'
    }
  },
  found: {
    color: 'green',
    zIndex: 10
  },
  notFound: {
    color: 'red',
    zIndex: 10
  }
})

class Marker extends Component {
  render() {
    const { handleCacheSelect, cache, classes, text, found } = this.props

    if (found) {
      return (
        <Tooltip title={text}>
          <IconButton className={classes.marker}>
            <CheckIcon className={classes.found} />
          </IconButton>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title={text}>
          <IconButton
            onClick={() => {handleCacheSelect(cache)}}
            className={classes.marker}
          >
            <FlagIcon className={classes.notFound} />
          </IconButton>
        </Tooltip>
      )
    }
  }
}


export default withStyles(styles)(Marker)
