import './globals.css'
import React from 'react'

export const metadata = {
  title: 'SAP mockup',
  description: 'POC Mockup Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen p-6 bg-[#E7F0F7]">{children}</body>
    </html>
  )
}
