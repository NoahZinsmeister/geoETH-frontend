import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import GoogleMapReact from 'google-map-react'
import Geolocation from 'react-geolocation';
import { withWeb3 } from 'web3-webpacked-react';

import Message from './Message';
import Marker from './Marker'
import LocationMarker from './LocationMarker'
import CacheManager from './CacheManager'

import MakeClaim from './MakeClaim'

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
    const existingSecrets = localStorage.getItem(this.props.address)
    if (existingSecrets !== null) {
      this.setState({currentSecrets: JSON.parse(existingSecrets)})
    }
  }

  addSecret = (id, secret) => {
    if (!this.isFound(id)) {
      this.setState(oldState => {
        const newSecrets = oldState.currentSecrets.concat([{id: id, secret: secret}])
        localStorage.setItem(this.props.address, JSON.stringify(newSecrets))
        return {currentSecrets: newSecrets}
      })
    }
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
            bootstrapURLKeys={{ key: 'AIzaSyAEAN2ts0SFThbcb-5RN0VKZXb8AHZVu24' }}
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

        {this.props.caches.length === this.state.currentSecrets.length ?
          <MakeClaim
            address={this.props.address}
            secrets={this.state.currentSecrets}
            reward={this.props.reward}
          /> :
          <CacheManager
            key={JSON.stringify(this.state.currentSecrets)}
            pinnedCache={this.state.pinnedCache}
            addSecret={this.addSecret}
            handleCacheHover={this.handleCacheHover}
            isFound={this.isFound}
            reduceCache={this.reduceCache}
            handleCacheSelect={this.handleCacheSelect}
            caches={this.props.caches}
            secrets={this.state.currentSecrets}
          />
        }

        <Message user={this.props.w3w.account} journey={this.props.name}/>
      </Fragment>
    )
  }
}

export default withStyles(styles)(withWeb3(Journey))
