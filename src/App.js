import { getGatewayURL, GatewayStatusChecker } from 'nftstorage.link'

const fakeStatusChecker = {
  ok: () => new Promise(resolve => resolve('NOT OK')),
  gatewayURL: 'https://nftstorage.link'
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

function GatewayLink({ cid, title }) {
  const [url, setUrl] = useState('')
  useEffect(async () => setUrl(await getGatewayURL(cid)), [cid])
  return url ? <a href={url}>{title}</a> : null
}

function GatewayImage({ cid, alt }) {
  const [url, setUrl] = useState('')
  useEffect(async () => setUrl(await getGatewayURL(cid)), [cid])
  return url ? <img src={url} alt={alt} /> : null
}

export default App
