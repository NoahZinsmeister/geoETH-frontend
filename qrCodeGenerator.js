var QRCode = require('qrcode')

const caches = [
  {id: '0', secret: 123, address: '0xJourneyAddress'},
  {id: '1', secret: 321, address: '0xJourneyAddress'}
]

caches.forEach(cache => {
  QRCode.toFile(`sampleCode${cache.id}.png`, JSON.stringify(cache))
})
