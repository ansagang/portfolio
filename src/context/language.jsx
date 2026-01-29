// app/(main)/language-wrapper.tsx
import { getLanguage } from "@/lib/get-language"
import { LanguageProvider } from "./language-provider"

export default async function LanguageWrapper({ children }) {
  const language = await getLanguage({})

  return (
    <LanguageProvider language={language}>
      {children}
    </LanguageProvider>
  )
}