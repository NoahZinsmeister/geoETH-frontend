import React, { Component } from 'react'
import Web3Provider, { NetworkUpdater, AccountUpdater } from 'web3-webpacked-react'

import JourneyPicker from './JourneyPicker'

class App extends Component {
  render() {
    return (
      <Web3Provider supportedNetworks={[1, 4]}>
        <NetworkUpdater>
          <AccountUpdater>
            <JourneyPicker />
          </AccountUpdater>
        </NetworkUpdater>
      </Web3Provider>
    );
  }
}

export default App
