import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  metadataBase: new URL('https://findingai.top'),
  title: 'Find AI Tools',
  description:
    'Find AI Tools is a collection of the best AI tools and resources available on the internet.',
  icons: {
    icon: '/favicon.ico',
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <meta name="google-site-verification" content="Uqey7nCWiOEStrPRmIEvsPUDSPsyJqQucTui7Mixqug"/>
    </head>
    <body className={inter.variable}>
    {children}
    <Analytics/>
    <SpeedInsights />
    </body>
    </html>
  )
}
