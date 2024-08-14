import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://findingai.top'),
  title: 'Top AI Tools',
  description:
    'Top AI Tools is a collection of the best AI tools and resources available on the internet.',
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
    <body className={inter.variable}>{children}</body>
    </html>
  )
}
