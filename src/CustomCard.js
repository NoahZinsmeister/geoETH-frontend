import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { withWeb3 } from 'web3-webpacked-react';

import BlockiesIdenticon from './BlockiesIdenticon'
import TransactionButton from './TransactionButton'

const divMargin = {
  margin: '8px'
};

class CustomCard extends Component {
  render() {
    const sendValue = {
      send: () => { return this.props.w3w.web3js.eth.sendTransaction({from: this.props.me, to: this.props.user, value: 10000000000000000}) },
      estimateGas: async () => { return 21000 }
    }
    return (
    <Card>
      <div style={divMargin}>
        <BlockiesIdenticon seed={this.props.user}/>
      </div>
      <CardContent>
        <Typography color="textSecondary">
          {this.props.user}
        </Typography>
        <TransactionButton
          buttonInitial="Tip 0.01 ETH"
          method={sendValue}
        />
      </CardContent>
    </Card>
    )
  }
}

export default withWeb3(CustomCard)
