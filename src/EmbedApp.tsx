import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import React, { useEffect, useState } from 'react'
import { useUserProvider } from './providers/UserProvider'

const EmbedApp = () => {
  const { safe } = useSafeAppsSDK()
  const [height, setHeight] = useState(0)
  const { token, message } = useUserProvider()

  console.log('token', token)
  console.log('message', message)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.method === 'gr_resize' && event.data.params && event.data.params.height) {
        setHeight(event.data.params.height)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])
  return safe.safeAddress && token ? (
    <iframe
      style={{ border: 'none', width: '100%', height: height + 'px' }}
      src={`https://embed.grindery.io/safe/slack?trigger.input._grinderyContractAddress=${safe.safeAddress}&trigger.input._grinderyChain=eip155:${safe.chainId}&action=sendChannelMessage`}
      title="Grindery Safe Embedded Integration"
    />
  ) : null
}

export default EmbedApp
