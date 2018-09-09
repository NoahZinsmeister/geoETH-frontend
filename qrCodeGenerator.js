var QRCode = require('qrcode')

const caches = [
  {id: '0', secret: 74274937, address: '0xJourneyAddress'},
  {id: '1', secret: 4739272, address: '0xJourneyAddress'},
  {id: '2', secret: 57482729, address: '0xJourneyAddress'}
]

caches.forEach(cache => {
  QRCode.toFile(`sampleCode${cache.id}.png`, JSON.stringify(cache))
})
