import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Typography } from '@material-ui/core'


class Body extends Component {
  render() {
    return (
      <Typography align="center">Account: {this.props.w3w.account}</Typography>
    )
  }
}

export default withWeb3(Body)
