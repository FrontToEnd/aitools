import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  metadataBase: new URL('https://www.findingai.top'),
  title: 'Find AI Tools',
  description:
    'Discover a comprehensive collection of AI tools from around the globe.',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['AI', 'tools', 'embeddings', 'search engine', 'datasets'],
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
