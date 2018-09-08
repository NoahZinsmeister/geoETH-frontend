import contracts from './contracts'

export function getFactoryContract () {
  const contractData = contracts[this.props.w3w.getNetworkName()].JourneyFactory
  return this.props.w3w.getContract(contractData.ABI, contractData.address)
}

export function getJourneyContract (address) {
  const contractABI = contracts[this.props.w3w.getNetworkName()].Journey.ABI
  return this.props.w3w.getContract(contractABI, address)
}
