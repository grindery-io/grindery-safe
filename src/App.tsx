import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'

const Container = styled.div`
  background: #fff;
  padding: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
`

const SafeApp = (): React.ReactElement => {
  const { safe } = useSafeAppsSDK()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.method === 'gr_resize' && event.data.params && event.data.params.height) {
        setHeight(event.data.params.height)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <Container>
      {safe.safeAddress && (
        <iframe
          style={{ border: 'none', width: '100%', height: height + 'px' }}
          src={`https://embed.grindery.io/safe/slack?trigger.input._grinderyContractAddress=${safe.safeAddress}&trigger.input._grinderyChain=eip155:${safe.chainId}&action=sendChannelMessage`}
          title="Grindery Safe Embedded Integration"
        />
      )}
    </Container>
  )
}

export default SafeApp
