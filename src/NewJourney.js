import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {withWeb3} from 'web3-webpacked-react'

class NewJourney extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      salt: 0,
      secrets: [],
      lats: [],
      longs: [],
      hints: []
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Add a Journey</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

export default withWeb3(NewJourney);
