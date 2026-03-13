import '@/styles/adaptive.scss'

import { Montserrat } from 'next/font/google'

import NotificationProvider from '@/context/notification-provider'
import { getLanguage } from '@/lib/get-language'
import NextTopLoader from 'nextjs-toploader'
import Cursor from '@/components/ui/cursor'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { Icons } from '@/config/icons'

const font = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], display: 'swap' })

export async function generateMetadata() {

  const language = await getLanguage({})

  const ogLocaleMap = { en: 'en_US', ru: 'ru_RU', kz: 'kz_KZ' }
  const BASE_URL = process.env.URL

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: language.app.meta.title,
      template: `%s | ${language.app.meta.title}`
    },
    description: language.app.meta.description,
    keywords: language.app.meta.keywords,
    authors: [
      {
        name: "ansagang",
        url: "https://github.com/ansagang",
      },
    ],
    creator: "ansagang",
    openGraph: {
      type: "website",
      locale: ogLocaleMap[language.lang] || 'en_US',
      title: language.app.meta.title,
      description: language.app.meta.description,
      siteName: language.app.meta.title,
      images: [`${BASE_URL}/images/banner-one.png`]
    },
    twitter: {
      card: "summary_large_image",
      title: language.app.meta.title,
      description: language.app.meta.description,
      images: [`${BASE_URL}/images/banner-one.png`],
      creator: "@ansagang",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow"
    },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          type: "image/x-icon"
        }
        // add favicon-32x32.png, favicon-96x96.png, android-chrome-192x192.png
      ],
      shortcut: [
        {
          url: "/favicon.ico",
          type: "image/x-icon"
        }
      ],
      apple: [
        {
          url: "/apple-icon.png",
          sizes: "57x57",
          type: "image/png"
        }
      ]
    }
  }
}

export default async function RootLayout({ children }) {

  const language = await getLanguage({})

  return (
    <html lang={language.lang}>
      <body className={font.className}>
        <NextTopLoader color='#000' showSpinner={false} shadow={false} height={5} />
        <div className="wrapper__main">
          <NotificationProvider>
            {children}
          </NotificationProvider>
          <Toaster
            toastOptions={{
              classNames: {
                toast: 'toast',
                title: 'title',
                description: 'description',
                actionButton: 'action-button',
                cancelButton: 'cancel-button',
                closeButton: 'close-button',
                icon: 'icon'
              },
            }}
          />
          <Cursor colors={['white']} pointers={['a', 'button', 'input']} cards={['card']} />
        </div>
      </body>
    </html>
  )
}