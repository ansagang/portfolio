// components/providers/language-provider.tsx
"use client"

import { createContext, useContext } from "react"

const LanguageContext = createContext(null)

export function LanguageProvider({ language, children }) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}