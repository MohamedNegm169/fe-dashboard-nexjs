import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "../components/providers/redux-provider"
import { Toaster } from "../components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "A comprehensive dashboard application built with Next.js, Redux, and TypeScript",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
