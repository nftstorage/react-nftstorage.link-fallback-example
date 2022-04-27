import { useState, useEffect } from 'react'
import { getGatewayURL } from 'nftstorage.link'

export default function App () {
  const [cid, setCid] = useState('bafkreiem4twkqzsq2aj4shbycd4yvoj2cx72vezicletlhi7dijjciqpui')
  const [simulateBadStatus, setSimulateBadStatus] = useState(false)
  const statusChecker = simulateBadStatus ? fakeStatusChecker : undefined

  return (
    <div className='ma4'>
      <h1>nftstorage.link fallback</h1>
      <label className='db mb3'>
        CID:
        <input className='input-reset courier ba pa2 ml1' value={cid} onInput={e => setCid(e.target.value)} style={{ width: '38rem' }} />
      </label>
      <p className='f6'>Try <span className='courier'>bafkreiajkbmpugz75eg2tmocmp3e33sg5kuyq2amzngslahgn6ltmqxxfa</span></p>
      <label className='db mb3'>
        <input className='mr1' type='checkbox' value={simulateBadStatus} onChange={e => setSimulateBadStatus(e.target.checked)} />
        Simulate bad status
      </label>
      <hr className='ba mv3' />
      <h2>Rendered Link:</h2>
      <div className='mb3'>
        <GatewayLink cidOrURL={cid} statusChecker={statusChecker}>{cid}</GatewayLink>
      </div>
      <h2>Rendered Image:</h2>
      <div className='mb3'>
        <GatewayImage cidOrURL={cid} statusChecker={statusChecker} alt={`Image of ${cid}`} className='mw6' />
      </div>
    </div>
  )
}

function GatewayLink ({ cidOrURL, statusChecker, fallbackGatewayURL, children, ...props }) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    getGatewayURL(cidOrURL, { statusChecker, fallbackGatewayURL }).then(setUrl)
  }, [cidOrURL, statusChecker, fallbackGatewayURL])
  return url ? <a href={url} {...props}>{children}</a> : null
}

function GatewayImage ({ cidOrURL, statusChecker, fallbackGatewayURL, alt, ...props }) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    getGatewayURL(cidOrURL, { statusChecker, fallbackGatewayURL }).then(setUrl)
  }, [cidOrURL, statusChecker, fallbackGatewayURL])
  return url ? <img src={url} alt={alt} {...props} /> : null
}

/**
 * Custom status checker that simulates an adverse status from the nft.storage
 * gateway status API.
 */
const fakeStatusChecker = {
  ok: () => new Promise(resolve => resolve(false)),
  gatewayURL: 'https://nftstorage.link'
}
