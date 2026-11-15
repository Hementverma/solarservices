import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import {
  defaultCalculatorConfig,
  defaultContact,
  locations as fallbackLocations,
  services as fallbackServices,
} from '@/data/site'

const ContentContext = createContext(null)

function mergeContact(contact) {
  if (!contact) return defaultContact
  return {
    ...defaultContact,
    ...contact,
    phoneRaw:
      contact.phoneRaw ||
      (contact.phone ? `+91${String(contact.phone).replace(/\D/g, '').slice(-10)}` : defaultContact.phoneRaw),
  }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState({
    contact: defaultContact,
    calculator: defaultCalculatorConfig,
    services: fallbackServices,
    locations: fallbackLocations,
    loaded: false,
  })

  useEffect(() => {
    let active = true
    api
      .get('/api/content')
      .then((data) => {
        if (!active) return
        setContent({
          contact: mergeContact(data.contact),
          calculator: { ...defaultCalculatorConfig, ...(data.calculator || {}) },
          services: data.services?.length ? data.services : fallbackServices,
          locations: data.locations?.length ? data.locations : fallbackLocations,
          loaded: true,
        })
      })
      .catch(() => {
        if (active) setContent((previous) => ({ ...previous, loaded: true }))
      })
    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => content, [content])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) throw new Error('useContent must be used within ContentProvider')
  return context
}
