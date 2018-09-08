import React, { Component, Fragment } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Typography, TextField, InputAdornment } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons';
import { getFactoryContract, getJourneyContract } from './utilities'

import Journey from './Journey'

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit * 5
  },
  search: {
    margin: theme.spacing.unit,
    width:  '100%'
  },
  searchContainer: {
    margin:    '0 auto',
    width:     '75%',
    textAlign: 'center'
  }
})

class JourneyPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText:      '',
      allJourneys:     [],
      currentJourneys: [],
      selectedJourney: {}
    }

    this.getFactoryContract = getFactoryContract.bind(this)
    this.getJourneyContract = getJourneyContract.bind(this)
  }

  getJourneyDetails = async address => {
    const contract = this.getJourneyContract(address)
    const details = await contract.methods.getDetails().call()

    const parseCaches = (caches) => {
      return caches.map(cache => {
        const lat = (cache[1] / 10000) - 90
        const lng = (cache[2] / 10000) - 180
        return { secret: cache[0], lat: lat, lng: lng, hint: cache[3] }
      })
    }

    const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const parsedCaches = parseCaches(details[4])
    const centerLat = average(parsedCaches.map(cache => {
      return cache.lat
    }))
    const centerLng = average(parsedCaches.map(cache => {
      return cache.lng
    }))

    return {
      name:        details[0],
      creator:     details[1],
      description: details[2],
      salt:        details[3],
      caches:      parsedCaches,
      center:      [centerLat, centerLng],
      resolved:    details[5],
      reward:      details[6],
      address:     address
    }
  }

  componentDidMount = () => {
    this.getFactoryContract().methods.getAdventures().call()
      .then(journeys => {
        const details = journeys.map(async journey => {
          return await this.getJourneyDetails(journey)
        })

        Promise.all(details)
          .then(results => {
            this.setState({allJourneys: results, currentJourneys: results})
          })
      })
      .catch(error => console.error(error))

    // const journeys = [
    //   {
    //     name: 'NYC',
    //     description: 'The best city on Earth',
    //     center: [40.7128, -74.0060],
    //     caches: [
    //       {lat: 40.7484, lng: -73.9857, hint: 'Look up!'},
    //       {lat: 40.6892, lng: -74.0445, hint: 'I heard that Lady Liberty is right-handed...'}
    //     ]
    //   },
    //   {
    //     name: 'San Francisco',
    //     description: 'West coast best coast',
    //     center: [37.7749, -122.4194],
    //     caches: [
    //       {lat: 37.8199, lng: -122.4783, hint: 'Don\'t fall off.'},
    //       {lat: 37.7596, lng: -122.4269, hint: 'Are you getting a workout?'}
    //     ]
    //   }
    // ]
  }

  filterBySearchText = (journeys, searchText) => {
    return journeys.filter(journey => {
      return (
        journey.name.toLowerCase().includes(searchText.toLowerCase()) ||
        journey.description.toLowerCase().includes(searchText.toLowerCase())
      )
    })
  }

  handleSearchTextChange = (event) => {
    const newText = event.target.value

    this.setState({
      searchText: newText,
      currentJourneys: this.filterBySearchText(this.state.allJourneys, newText)
    })
  }

  handleJourneySelect = (journey) => {
    if (Object.keys(this.state.selectedJourney).length === 0) {
      this.setState({
        currentJourneys: [journey],
        selectedJourney: journey
      })
    } else {
      this.setState({
        currentJourneys: this.filterBySearchText(this.state.allJourneys, this.state.searchText),
        selectedJourney: {}
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Typography variant="display3" align="center" className={classes.title}>GeoETH</Typography>

        <div className={classes.searchContainer}>
          <TextField
            className={classes.search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={this.handleSearchTextChange}
          />

          <List component="nav">
            {this.state.currentJourneys.map((journey, i) => {
              return (
                <Fragment key={journey.name}>
                  {i === 0 ? undefined : <Divider />}
                  <ListItem button onClick={() => this.handleJourneySelect(journey)}>
                    <ListItemText primary={journey.name} secondary={journey.description} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={this.state.selectedJourney.name === journey.name}
                        onClick={() => this.handleJourneySelect(journey)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </Fragment>
              )
            })}
          </List>

          {Object.keys(this.state.selectedJourney).length === 0 ?
            undefined :
            <Journey {...this.state.selectedJourney} />
           }
        </div>

      </Fragment>
    )
  }
}

export default withStyles(styles)(withWeb3(JourneyPicker))
