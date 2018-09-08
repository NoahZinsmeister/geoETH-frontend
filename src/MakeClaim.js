import React, { Component, Fragment } from 'react'
import { withWeb3 } from 'web3-webpacked-react';
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
  }
})

class MakeClaim extends Component {
  constructor(props) {
    super(props)

    this.getJourneyContract = getJourneyContract.bind(this)
  }

  render() {
    const { address } = this.props

    const secrets = this.props.secrets.map(secret => secret.secret)
    const claim = this.props.w3w.web3js.utils.soliditySha3(...secrets, this.props.w3w.account)
    console.log(claim)

    return (
      <Fragment>
        <TransactionButton
          buttonInitial='Make Claim'
          method={this.getJourneyContract(address).methods.submitClaim(claim)}
        />

        <TransactionButton
          buttonInitial='Finalize Claim'
          method={this.getJourneyContract(address).methods.submitProof(secrets)}
        />
      </Fragment>
    )
  }
}


export default withStyles(styles)(withWeb3(MakeClaim))
