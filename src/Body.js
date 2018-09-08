import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Typography } from '@material-ui/core';

import Message from './Message';


class Body extends Component {
  render() {
    return (
      <div>
      <Typography align="center">Account: {this.props.w3w.account}</Typography>
      <Message></Message>
      </div>
    )
  }
}

export default withWeb3(Body)
