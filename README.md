# GeoETH

This is an [ETHBerlin](https://ethberlin.com/) Hackathon project!

[Live Website](https://geoeth.ethberl.in/)

This is a decentralized [geocaching game](https://www.geocaching.com/play). Users can search for QR codes which store data which is registered in a smart contract.

## Tech Stack

### Smart Contracts

The smaart contracts are housed in [this github repository](https://github.com/alexkroeger/GeoETH-contracts).

| Network | Contract                                   |
|---------|--------------------------------------------|
| Rinkeby | 0xc1138d2b01cd7adc1e100a124fba742ba06d3796 |
| Mainnet | Coming Soon                                |

The smart contracts consist of 2 contracts, Adventure Factory and Adventure. The factory contract creates adventures and stores a public list of all availale adventures. The adventure contract is an instance of a geocaching adventure. This has some key variables such as Caches (the locations of the QR codes), Claims (secret transactions where users claim they have found a QR code) and Proofs (public transactions where users prove they have given the correct QR codes).

### Messaging Backend

The messaging on this app utilizes I backend which can be found [here](https://github.com/andy8052/geoETH-backend)

The logic in the app allows for users who are participating in the same game to communicate with each other and help each other find the QR codes. Users have a unique logo deterministically generated for their name through Blockies. This logo is clickable and gives you more information about a person you are chatting with. It also allows you to tip that person should they be extra helpful to you!

The messaging server is a Socket.io server running on Node.js. It handles multiple messaging channels (one for each game). The front end application also utilizes the Socket.io-client repo to subscribe to emitted events from the server.

### React Front End

The bulk of the code is written here in the react front end. The app handles location, QR code scanning, web3 integration and messaging. Users are able to see their location relative to the latitude and longitude of the cache. This is all achieved through the Google Maps API. Once a QR code is found, they are able to scan it and submit a claim to the adventure smart contract that the QR code is related to. From here, once all the claims are submitted, they can prove correctness of the claims. Users, as mentioned above, are able to message each other to help in their search.
