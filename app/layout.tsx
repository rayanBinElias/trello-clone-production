import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Modal from '@/components/Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trello AI Clone',
  description: 'Generated by Ray',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>
    </html>
  )
}