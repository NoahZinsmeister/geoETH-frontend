import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getFactoryContract } from './utilities'
import { withWeb3 } from 'web3-webpacked-react'

const root = {
  margin: 10
}

class NewJourney extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      salt: 0,
      reward: 0,
      secrets: '',
      lats: '',
      longs: '',
      hints: ''
    }

    this.getFactoryContract = getFactoryContract.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  parseSecrets = (secrets) => {
    return secrets.map(secret => {
      return this.props.w3w.web3js.utils.soliditySha3(Number(secret), this.state.salt)
    })
  }

  parseLats = (lats) => {
    return lats.map(lat => {
      return parseInt((Number(lat) + 90) * 10000, 10)
    })
  }

  parseLongs = (longs) => {
    return longs.map(long => {
      return parseInt((Number(long) + 180) * 10000, 10)
    })
  }

  parseArray = (string) => {
    return string.substring(1, string.length - 1).replace(' ', '').split(',')
  }

  parseState = () => {
    return [
      this.state.name,
      this.state.description,
      Number(this.state.salt),
      this.parseSecrets(this.parseArray(this.state.secrets)),
      this.parseLats(this.parseArray(this.state.lats)),
      this.parseLongs(this.parseArray(this.state.longs)),
      this.parseArray(this.state.hints),
    ]
  }

  render() {
    return (
      <div style={{marginTop: 50}}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Add a Journey</Typography>
          </ExpansionPanelSummary>
          <div style={root}>
            <TextField
              fullWidth
              id="name"
              label="name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleChange('description')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="salt"
              label="Salt"
              value={this.state.salt}
              onChange={this.handleChange('salt')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="reward"
              label="Reward"
              value={this.state.reward}
              onChange={this.handleChange('reward')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="secrets"
              label="Secrets"
              value={this.state.secrets}
              onChange={this.handleChange('secrets')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="lats"
              label="Latitudes"
              value={this.state.lats}
              onChange={this.handleChange('lats')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="longs"
              label="Longitudes"
              value={this.state.longs}
              onChange={this.handleChange('longs')}
              margin="normal"
            />
            <TextField
              fullWidth
              id="hints"
              label="Hints"
              value={this.state.hints}
              onChange={this.handleChange('hints')}
              margin="normal"
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                this.getFactoryContract().methods.createNewAdventure(...this.parseState())
                  .send({ from: this.props.w3w.account, value: this.props.w3w.fromDecimal(String(this.state.reward), 18) })
              }}
            >
              Make New Journey
            </Button>
          </div>
        </ExpansionPanel>
      </div>
    )
  }
}

export default withWeb3(NewJourney);
