import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';

class Body extends Component {
  render() {
    return (
      <p>{this.props.w3w.account}</p>
    )
  }
}

export default withWeb3(Body)
