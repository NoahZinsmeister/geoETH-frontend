import React, { Component, Fragment } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Typography, TextField, InputAdornment } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons';

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
  state = {
    searchText:      '',
    allJourneys:     [],
    currentJourneys: [],
    selectedJourney: {}
  }

  componentDidMount = () => {
    const journeys = [
      {
        name: 'NYC',
        description: 'The best city on Earth',
        center: [40.7128, -74.0060],
        caches: [
          {lat: 40.7484, lng: -73.9857, hint: 'Look up!'},
          {lat: 40.6892, lng: -74.0445, hint: 'I heard that Lady Liberty is right-handed...'}
        ]
      },
      {
        name: 'San Francisco',
        description: 'West coast best coast',
        center: [37.7749, -122.4194],
        caches: [
          {lat: 37.8199, lng: -122.4783, hint: 'Don\'t fall off.'},
          {lat: 37.7596, lng: -122.4269, hint: 'Are you getting a workout?'}
        ]
      },
      {
        name: 'Berlin',
        description: 'Home of ETHBerlin',
        center: [52.5200, 13.4050],
        caches: [
          {lat: 52.5169, lng: 13.4019, hint: 'I can see the whole city from here.'},
          {lat: 52.5163, lng: 13.3777, hint: 'It pays to look where you\'re going.'}
        ]
      }
    ]

    this.setState({allJourneys: journeys, currentJourneys: journeys})
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
