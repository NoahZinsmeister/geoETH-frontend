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
  },
  found: {
    color: 'green'
  },
  notFound: {
    color: 'red'
  }
})

class Marker extends Component {
  render() {
    const { handleCacheSelect, cache, classes, text, found } = this.props

    if (found) {
      return (
        <IconButton disabled className={classes.marker}>
          <CheckIcon className={classes.found} />
        </IconButton>
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
