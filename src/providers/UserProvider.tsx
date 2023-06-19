/*import React, { createContext, useEffect, useContext, useState } from 'react'
import { encode } from 'universal-base64url'
import SafeAppsSDK from '@safe-global/safe-apps-sdk'

type Opts = {
  allowedDomains?: RegExp[]
  debug?: boolean
}

const opts: Opts = {
  allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
  debug: false,
}

const appsSdk = new SafeAppsSDK(opts)

const ENGINE_URL = 'https://orchestrator.grindery.org'

const settings = {
  offChainSigning: true,
}

export type AuthToken = {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

// Context props
type ContextProps = {}

// Context provider props
type UserProviderProps = {
  children: React.ReactNode
  address?: string
}

// Init context
export const UserContext = createContext<ContextProps>({})

export const UserProvider = ({ children, address }: UserProviderProps) => {
  // Auth message
  const [message, setMessage] = useState<string | null>(null)

  // Authentication token object
  const [token, setToken] = useState<AuthToken | null>(null)

  // Signed authentication message
  const [signature, setSignature] = useState<string | null>(null)

  const code =
    (message &&
      signature &&
      encode(
        JSON.stringify({
          message: message,
          signature: signature,
        }),
      )) ||
    ''

  // Fetch authentication message or access token from the engine API
  const startSession = async (userAddress: string) => {
    // Try to fetch access token
    const resWithCreds = await fetch(`${ENGINE_URL}/oauth/session?address=${userAddress}`, {
      method: 'GET',
      credentials: 'include',
    })
    if (resWithCreds && resWithCreds.ok) {
      let json = await resWithCreds.json()

      // Set access token if exists
      if (json.access_token) {
        setToken(json)
      } else if (json.message) {
        // Or set auth message
        setMessage(json.message)
      }
    } else {
      console.error('startSessionWithCreds error', (resWithCreds && resWithCreds.status) || 'Unknown error')
    }
  }

  // Sign authentication message with MetaMask
  const signMessage = async (msg: string) => {
    try {
      const currentSettings = await appsSdk.eth.setSafeSettings([settings])

      const hash = await appsSdk.txs.signMessage(msg)
      //const offChainSignature = await appsSdk.safe.getOffChainSignature(hash);

      setSignature(hash.toString() || null)
    } catch (error) {
      console.error('signMessage error', error)
      setSignature(null)
      setToken(null)
    }
  }

  // Get access token from the engine API
  const getToken = async (code: string) => {
    const res = await fetch(`${ENGINE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
      }),
    })

    if (res.ok) {
      let result = await res.json()
      setToken(result)
    } else {
      console.error('getToken error', res.status)
      setToken(null)
    }
  }

  // Set refresh_token cookie
  const registerAuthSession = async (refresh_token: string) => {
    const res = await fetch(`${ENGINE_URL}/oauth/session-register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    })

    if (!res.ok) {
      console.error('registerAuthSession error', res.status)
    }
  }

  // Remove refresh_token cookie
  const clearAuthSession = async () => {
    const res = await fetch(`${ENGINE_URL}/oauth/session-register`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!res.ok) {
      console.error('clearAuthSession error', res.status)
    }
  }

  // set user if token and address is known
  useEffect(() => {
    if (address && token && token.access_token) {
      if (token.refresh_token) {
        registerAuthSession(token.refresh_token)
      }
    }
  }, [token, address])

  // Start session if user address is known
  useEffect(() => {
    if (address && !message && !signature && !token) {
      startSession(address)
    }
  }, [address, message, signature, token])

  // Sign authentication message if message is known
  useEffect(() => {
    if (message && !signature && !token) {
      signMessage(message)
    }
  }, [message, signature, token])

  // Get authentication token if message is signed
  useEffect(() => {
    if (code && !token) {
      getToken(code)
    }
  }, [code, token])

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}

export const useUserProvider = () => useContext(UserContext)

export default UserProvider
*/

export {}
