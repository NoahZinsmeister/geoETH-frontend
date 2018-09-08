import React, { Component } from 'react'
import { withWeb3 } from 'web3-webpacked-react';
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import { getJourneyContract } from './utilities'
import TransactionButton from './TransactionButton'

const styles = theme => ({
  qr: {
    width: '50%'
  },
  paperFullScreen: {
    width: '75%',
    height: '75%'
  },
  root: {
    textAlign: 'left',
    margin: theme.spacing.unit * 2,
  },
  none: {
    display: 'none'
  }
})

class MakeClaim extends Component {
  constructor(props) {
    super(props)

    this.state = {
      finalize: false
    }

    this.getJourneyContract = getJourneyContract.bind(this)
  }

  render() {
    const { classes, address } = this.props

    const secrets = this.props.secrets.map(secret => secret.secret)
    const claim = this.props.w3w.web3js.utils.soliditySha3(...secrets, this.props.w3w.account)

    return (
      <div className={classes.root}>
        <Typography variant="body1" gutterBottom>
          {!this.state.finalize ?
            `Wow, you found all the secrets! Submit a crytographic hash to ensure that no tampering occurs.` :
            `Now, claim your ${this.props.reward} ETH prize!`
          }
        </Typography>

        <TransactionButton
          hidden={this.state.finalize}
          buttonInitial='Submit Results'
          method={this.getJourneyContract(address).methods.submitClaim(claim)}
          onConfirmation={() => this.setState({finalize: true})}
        />

        <TransactionButton
          hidden={!this.state.finalize}
          buttonInitial='Claim Prize'
          buttonSuccess='Congratulations! Your prize is waiting for you in your Ethereum address.'
          method={this.getJourneyContract(address).methods.submitProof(secrets)}
        />
      </div>
    )
  }
}


export default withStyles(styles)(withWeb3(MakeClaim))
