import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import { Checkbox, Divider } from '@material-ui/core'
import { ListSubheader, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Check as CheckIcon } from '@material-ui/icons';

import ScanSecret from './ScanSecret'

const styles = theme => ({
  found: {
    color: 'green'
  }
})

class CacheManager extends Component {
  constructor(props) {
    super(props)

    this.remainingSecrets = props.caches.length - props.secrets.length
  }


  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <ScanSecret addSecret={this.props.addSecret} />

        <List component="nav" subheader={
          <ListSubheader>
            {`${this.remainingSecrets} secret${this.remainingSecrets > 1 ? 's' : ''} left to go!`}
          </ListSubheader>
        }>
          {this.props.caches.map((cache, i) => {
            if (this.props.isFound(i)) {
              return undefined
            }

            return (
              <ListItem
                button
                key={this.props.reduceCache(cache)}
                selected={this.props.reduceCache(this.props.pinnedCache) === this.props.reduceCache(cache)}
                onClick={() => this.props.handleCacheSelect(cache)}
                onMouseEnter={() => this.props.handleCacheHover(cache)}
                onMouseLeave={() => this.props.handleCacheHover()}
              >
                <ListItemText primary={`Cache ${i}`} secondary={cache.hint} />
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={this.props.reduceCache(this.props.pinnedCache) === this.props.reduceCache(cache)}
                    onClick={() => this.props.handleCacheSelect(cache)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>

        {this.props.secrets.length > 0 ?
          <Fragment>
            <Divider />
            <List component="nav" subheader={<ListSubheader>Found Secrets</ListSubheader>}>
              {this.props.caches.map((cache, i) => {
                if (!this.props.isFound(i)) {
                  return undefined
                }

                return (
                  <ListItem
                    button
                    key={this.props.reduceCache(cache)}
                    onMouseEnter={() => this.props.handleCacheHover(cache)}
                    onMouseLeave={() => this.props.handleCacheHover()}
                  >
                    <ListItemText primary={`Cache ${i}`} secondary={cache.hint} />
                    <ListItemSecondaryAction>
                      <IconButton disabled>
                        <CheckIcon className={classes.found} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })}
            </List>
          </Fragment> :
          undefined
        }
      </Fragment>
    )
  }
}

export default withStyles(styles)(CacheManager)
