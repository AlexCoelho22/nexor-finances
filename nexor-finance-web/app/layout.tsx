import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NΞXOR FINANCE',
  description: 'Disciplina. Estratégia. Longo Prazo.',
  manifest: '/manifest.json',
  themeColor: '#7B2CBF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NΞXOR FINANCE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7B2CBF" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-background text-white min-h-screen">{children}</body>
    </html>
  )
}
