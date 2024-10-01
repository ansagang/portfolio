import '@/styles/adaptive.scss'

import { Montserrat } from 'next/font/google'

import NotificationProvider from '@/context/notification-provider'
import { getLanguage } from '@/lib/get-language'

import AnimatedCursor from 'react-animated-cursor'
import Cursor from '@/components/ui/cursor'

const font = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], fallback: 'false' })

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
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
      locale: "en_US",
      //   url: siteConfig.url,
      title: language.app.meta.title,
      description: language.app.meta.description,
      siteName: language.app.meta.title,
    },
    twitter: {
      card: "summary_large_image",
      title: language.app.meta.title,
      description: language.app.meta.description,
      // images: [`${siteConfig.url}/og.jpg`],
      creator: "@ansagang",
    },
    icons: {
      icon: [
        {
          url: '/images/icon_dark.ico',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/images/icon_light.ico',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    }
  }
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={font.className}>
      <div className="wrapper__main">
        <NotificationProvider>
            {children}
          </NotificationProvider>
          {/* <AnimatedCursor innerSize={15} outerSize={15} innerScale={2} outerScale={2} outerAlpha={0} innerStyle={{background: 'rgba(0, 0, 0, 0.5)'}} outerStyle={{ border: '2px solid #000' }} trailingSpeed={1} clickables={['a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select', 'textarea', '.link', 'button', '.header__nav-logo',
          {
            target: '.white',
            outerStyle: { border: '2px solid white' },
            innerStyle: {background: 'rgba(255, 255, 255, 0)'}
          }]} /> */}
          <Cursor colors={['white']} pointers={['a', 'button', 'input']} />
      </div>
      </body>
    </html>
  )
}