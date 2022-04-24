import { createContext, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import es from 'translations/es.json'
import en from 'translations/en.json'

const I18NContext = createContext()

const locales = { es, en }

export function I18NPovider({ children }) {
  const { locale } = useRouter()

  const t = useCallback(
    (key, ...args) => {
      let translation = locales[locale][key]
      if (args.length === 0) return translation

      args.forEach((value, i) => {
        translation = translation.replace(`\${${i + 1}}`, value)
      })

      return translation
    },
    [locale]
  )

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>
}

export function useI18N() {
  const context = useContext(I18NContext)
  if (context === undefined) {
    throw new Error('useI18N must be used within a I18NPovider')
  }
  return context
}
