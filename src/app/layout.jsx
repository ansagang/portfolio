import '@/styles/adaptive.scss'

import { Montserrat } from 'next/font/google'

import { getLanguage } from '@/lib/get-language'
import NextTopLoader from 'nextjs-toploader'
import Cursor from '@/components/ui/cursor'
import { Toaster } from 'sonner'

const font = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], display: 'swap' })

export const metadata = {
  metadataBase: new URL(process.env.URL),
  authors: [{ name: "ansagang", url: "https://github.com/ansagang" }],
  creator: "ansagang",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", sizes: "57x57", type: "image/png" }]
  }
}

export default async function RootLayout({ children }) {

  const language = await getLanguage({})

  return (
    <html lang={language.lang}>
      <body className={font.className}>
        <NextTopLoader color='#000' showSpinner={false} shadow={false} height={5} />
        <div className="wrapper__main">
          {children}
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
