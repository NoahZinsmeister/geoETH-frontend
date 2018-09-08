import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Checkbox, Divider } from '@material-ui/core'
import { ListSubheader, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { Check as CheckIcon } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react'
import Geolocation from 'react-geolocation';

import Marker from './Marker'
import LocationMarker from './LocationMarker'

import dotenv from 'dotenv'
dotenv.config()

const styles = theme => ({
  map: {
    height: '50vh',
    width:  '100%'
  },
  found: {
    color: 'green'
  }
})

class Journey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapCenter: this.props.center,
      currentPosition: undefined,
      zoom: 11,
      pinnedCache: {},
      currentSecrets: []
    }
  }

  componentDidMount() {
    this.setState({currentSecrets: [{id: 0, secret: 123}]})
  }

  reduceCache(cache) {
    return JSON.stringify(cache.lat, cache.lng)
  }

  handleCacheSelect = (cache) => {
    if (Object.keys(this.state.pinnedCache).length === 0 || this.state.pinnedCache !== cache) {
      this.setState({
        mapCenter: [cache.lat, cache.lng],
        zoom: 13,
        pinnedCache: cache
      })
    } else {
      this.restoreDefault()
    }
  }

  restoreDefault = () => {
    this.setState({
      mapCenter: this.props.center,
      zoom: 11,
      pinnedCache: {}
    })
  }

  handleCacheHover = (cache) => {
    if (Object.keys(this.state.pinnedCache).length !== 0) {
      return
    }

    if (cache === undefined) {
      this.restoreDefault()
      return
    }

    this.setState({
      mapCenter: [cache.lat, cache.lng],
      zoom: 13
    })
  }

  isFound = (i) => {
    return this.state.currentSecrets.map(secret => secret.id).includes(i)
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <div className={classes.map}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            center={this.state.mapCenter}
            zoom={this.state.zoom}
          >
            <Geolocation onSuccess={position => this.setState({currentPosition: position})} />
            {this.state.currentPosition ?
              <LocationMarker
                lat={this.state.currentPosition.coords.latitude}
                lng={this.state.currentPosition.coords.longitude}
              /> :
              undefined
            }

            {this.props.caches.map((cache, i) => {
              return (
                <Marker
                  key={this.reduceCache(cache)}
                  lat={cache.lat}
                  lng={cache.lng}
                  text={`${i}: ${cache.hint}`}
                  found={this.isFound(i)}
                  handleCacheSelect={this.isFound(i) ? undefined : this.handleCacheSelect}
                  cache={cache}
                />
              )
            })}
          </GoogleMapReact>
        </div>

        <List component="nav" subheader={<ListSubheader>Remaining Secrets</ListSubheader>}>
          {this.props.caches.map((cache, i) => {
            if (this.isFound(i)) {
              return undefined
            }

            return (
              <ListItem
                button
                key={this.reduceCache(cache)}
                selected={this.reduceCache(this.state.pinnedCache) === this.reduceCache(cache)}
                onClick={() => this.handleCacheSelect(cache)}
                onMouseEnter={() => this.handleCacheHover(cache)}
                onMouseLeave={() => this.handleCacheHover()}
              >
                <ListItemText primary={`Cache ${i}`} secondary={cache.hint} />
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={this.reduceCache(this.state.pinnedCache) === this.reduceCache(cache)}
                    onClick={() => this.handleCacheSelect(cache)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>

        {this.state.currentSecrets.length > 0 ? <Divider /> : undefined}

        <List component="nav" subheader={<ListSubheader>Found Secrets</ListSubheader>}>
          {this.props.caches.map((cache, i) => {
            if (!this.isFound(i)) {
              return undefined
            }

            return (
              <ListItem
                button
                key={this.reduceCache(cache)}
                onMouseEnter={() => this.handleCacheHover(cache)}
                onMouseLeave={() => this.handleCacheHover()}
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
      </Fragment>
    )
  }
}

export default withStyles(styles)(Journey)
