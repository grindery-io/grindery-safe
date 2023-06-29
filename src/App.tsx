import React from 'react'
import styled from 'styled-components'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import UserProvider from './providers/UserProvider'
import EmbedApp from './EmbedApp'

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

const SafeApp = () => {
  const { safe } = useSafeAppsSDK()

  return (
    <Container>
      <UserProvider address={safe.safeAddress}>
        <EmbedApp />
      </UserProvider>
    </Container>
  )
}

export default SafeApp
